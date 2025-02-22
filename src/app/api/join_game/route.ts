import { NextResponse } from 'next/server';
import clientPromise from "../../../../lib/mongodb";

export async function POST(req: Request) {
    try {
        const { gameJoinCode, player } = await req.json(); // Get data from the request body

        // Connect to the database
        await clientPromise.connect();
        const db = clientPromise.db('hexgame');
        const gamesCollection = db.collection('activeGames');
        const joinedGame = await gamesCollection.findOne({gameJoinCode: gameJoinCode});
        if (!joinedGame) throw new Error('Invalid game joinCode: ' + gameJoinCode);
        const usersCollection = db.collection(`users-${joinedGame.gameID}`);

        // Add the game info as the first document in the user collection then add the first user (the host)
        const result = await usersCollection.insertOne(player);

        return NextResponse.json({ message: 'Document added successfully', result });
    } catch (error) {
        console.error('Error inserting document:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await clientPromise.close();
    }
}