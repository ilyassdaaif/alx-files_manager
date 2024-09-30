import { connectToDb, getDb } from '../utils/db.js';

const AppController = {
  getStatus: async (req, res) => {
    await connectToDb(); // Ensure the database is connected
    const status = { redis: true, db: getDb() !== undefined };
    res.status(200).json(status);
  },
  getStats: async (req, res) => {
    try {
      const db = await connectToDb();
      const usersCount = await db.collection('users').countDocuments();
      const filesCount = await db.collection('files').countDocuments();
      res.status(200).json({ users: usersCount, files: filesCount });
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch stats' });
    }
  },
};

export default AppController;
