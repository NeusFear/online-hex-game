import { NextResponse } from 'next/server';
import clientPromise from "../../../../lib/mongodb";

export async function POST(req: Request) {
    try {
        const { host, gameUUID } = await req.json(); // Get data from the request body

        // Connect to the database
        const collectionName = `users-${gameUUID}`;
        await clientPromise.connect();
        const db = clientPromise.db('hexgame');
        await db.createCollection(collectionName);
        const collection = db.collection(collectionName);

        // Add the host as the first user of the game
        const result = await collection.insertOne(host);

        return NextResponse.json({ message: 'Document added successfully', result });
    } catch (error) {
        console.error('Error inserting document:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await clientPromise.close();
    }
}