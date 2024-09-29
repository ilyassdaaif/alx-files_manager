// utils/db.js
import { MongoClient } from 'mongodb';

class DBClient {
    constructor() {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'files_manager';
        
        // Create a MongoDB client
        this.client = new MongoClient(`mongodb://${host}:${port}/${database}`);
        this.db = null;

        // Automatically connect when the class is initialized
        this.connect();
    }

    async connect() {
        try {
            await this.client.connect();
            this.db = this.client.db();
            console.log('Connected to MongoDB');
        } catch (err) {
            console.error('MongoDB connection error:', err);
        }
    }

    isAlive() {
        // Check if the client is connected
        return this.db !== null;
    }

    async nbUsers() {
        if (!this.db) {
            await this.connect();
        }
        return this.db.collection('users').countDocuments();
    }

    async nbFiles() {
        if (!this.db) {
            await this.connect();
        }
        return this.db.collection('files').countDocuments();
    }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();
export default dbClient;