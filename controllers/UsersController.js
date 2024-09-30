// controllers/UsersController.js
import { MongoClient, ObjectId } from 'mongodb';
import crypto from 'crypto';
import dbClient from '../utils/db';

// Function to hash a password using SHA1
const sha1Hash = (password) => {
  return crypto.createHash('sha1').update(password).digest('hex');
};

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    // Validate email and password
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    try {
      // Check if user already exists in the database
      const existingUser = await dbClient.db.collection('users').findOne({ email });
      if (existingUser) {
	return res.status(400).json({ error: 'Already exist' });
      }

      // Hash the password
      const hashedPassword = sha1Hash(password);

      // Create a new user document
      const newUser = {
	email,
	password: hashedPassword,
      };

      // Insert the new user into the database
      const result = await dbClient.db.collection('users').insertOne(newUser);

      // Return the response with the new user ID and email
      return res.status(201).json({ id: result.insertedId, email });
    } catch (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default UsersController;
