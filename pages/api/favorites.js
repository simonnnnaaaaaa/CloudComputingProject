import { connectToDatabase } from '@/lib/mongodb';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    console.log("API /favorites called");
    console.log("Request method:", req.method);
    console.log("Cookies:", req.headers.cookie);

    const session = await getSession({ req });
    console.log("Session:", session);

    if (!session) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { database } = await connectToDatabase();
    const favoritesCollection = database.collection('favorites');

    if (req.method === 'GET') {
        const favorites = await favoritesCollection.find({ userEmail: session.user.email }).toArray();
        return res.status(200).json(favorites);
    }

    if (req.method === 'POST') {
        const { recipeId, title, image } = req.body;

        if (!recipeId || !title) {
            return res.status(400).json({ error: 'recipeId și title sunt obligatorii' });
        }

        const exists = await favoritesCollection.findOne({ userEmail: session.user.email, recipeId });
        if (exists) {
            return res.status(400).json({ error: 'Această rețetă este deja în favorite' });
        }

        const favorite = {
            userEmail: session.user.email,
            recipeId,
            title,
            image,
            createdAt: new Date()
        };

        await favoritesCollection.insertOne(favorite);
        return res.status(201).json(favorite);
    }

    if (req.method === 'DELETE') {
        const { recipeId } = req.body;

        if (!recipeId) {
            return res.status(400).json({ error: 'recipeId este obligatoriu' });
        }

        await favoritesCollection.deleteOne({ userEmail: session.user.email, recipeId });
        return res.status(200).json({ message: 'Deleted' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
