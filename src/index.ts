import express, { Application } from 'express';
import dotenv from 'dotenv';

import authorRoutes from './routes/authorRoutes';

// Initialize environment variables
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use('/authors', authorRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to the Bookstore API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
