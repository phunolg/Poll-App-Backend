import { MongoClient } from 'mongodb';
import 'dotenv/config';

let dbInstance = null;

const client = new MongoClient(process.env.MONGODB_URI);

const connectDB = async () => {
    try {
        await client.connect();
        dbInstance = client.db(process.env.DB_NAME);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err;
    }
}

const getDB = () => {
    if (!dbInstance) {
        throw new Error('Database not initialized. Call connectDB first.'); 
    }
    return dbInstance;
}

export { connectDB, getDB };