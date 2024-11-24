import { MongoClient } from 'mongodb';

export default async function connectToDatabase(stringConexao) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(stringConexao);
        console.log('Connecting to the cluster from database...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB Atlas!');

        return mongoClient;
    } catch (error) {
        console.error('Failed to connect to the database!', error);
        process.exit();
    }
}