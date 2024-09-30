// routes/index.js
import express from 'express';
import UsersController from '../controllers/UsersController';

const router = express.Router();

// Define the route to create a new user
router.post('/users', UsersController.postNew);

export default router;
