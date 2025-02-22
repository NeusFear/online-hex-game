import { NextResponse } from 'next/server';
import clientPromise from "../../../../lib/mongodb";

export async function POST(req: Request) {
    try {
        const { gameUUID } = await req.json(); // Get data from the request body

        // Connect to the database
        //TODO drop map collection too once added
        const usersCollectionName = `users-${gameUUID}`;

        await clientPromise.connect();
        const db = clientPromise.db('hexgame');
        const result = await db.dropCollection(usersCollectionName);

        return NextResponse.json({ message: 'Document added successfully', result });
    } catch (error) {
        console.error('Error inserting document:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await clientPromise.close();
    }
}