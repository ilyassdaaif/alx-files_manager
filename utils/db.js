// utils/db.js
import { MongoClient } from 'mongodb';
import { promisify } from 'util';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    const url = `mongodb://${host}:${port}`;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.client.connect();
    this.db = this.client.db(database);
  }

  // Function to check if the database connection is alive
  isAlive() {
    return this.client.isConnected();
  }

  // Function to retrieve the number of documents in a collection
  async nbUsers() {
    return this.db.collection('users').countDocuments();
  }
}

// Create an instance of the database client
const dbClient = new DBClient();
export default dbClient;
