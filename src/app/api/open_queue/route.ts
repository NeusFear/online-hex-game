import { NextResponse } from 'next/server';
import clientPromise from "../../../../lib/mongodb";
import {GameInfo} from "@/app/data/gameInfo";
import {generateRandomCode} from "@/util/randomCodeGenerator";

export async function POST(req: Request) {
    try {
        const { host, gameUUID } = await req.json(); // Get data from the request body

        // Connect to the database
        await clientPromise.connect();
        const db = clientPromise.db('hexgame');

        //Generate game join code
        const collections = await db.listCollections().toArray();

        //Find all currently active games
        const noGoIDs:string[] = []
        for (const collection of collections) {
            if (collection.name.startsWith("users-")) {
                const doc = await db.collection(collection.name).findOne(
                    { "gameJoinCode": { "$exists": true } }, // Check if 'gameJoinCode' exists
                    { projection: { "_id": 0, "gameJoinCode": 1 } } // Only return 'gameJoinCode'
                );
                if (doc) {
                    noGoIDs.push(doc.toString());
                }
            }
        }

        //Generate a unique code
        let gameJoinCode = generateRandomCode(6);
        while (noGoIDs.includes(gameJoinCode)) gameJoinCode = generateRandomCode(6);

        //Create this game
        const userCollectionName = `users-${gameUUID}`;
        await db.createCollection(userCollectionName);
        const collection = db.collection(userCollectionName);

        // Add the game info as the first document in the user collection then add the first user (the host)
        const docs = [
            new GameInfo(gameJoinCode),
            host,
        ]
        const result = await collection.insertMany(docs);

        return NextResponse.json({ message: 'Document added successfully', gameJoinCode, result });
    } catch (error) {
        console.error('Error inserting document:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await clientPromise.close();
    }
}