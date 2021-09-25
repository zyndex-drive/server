// Initialization
import dotenv from 'dotenv';

// Server
import server from '@/server';

// Database
import mongoose, { Error } from 'mongoose';
import db from '@/helpers/db';

// Health Check Service
import healthChecker from '@/helpers/express/health-check';

// Load ENV Variables to the Process
dotenv.config();

// Connect to Datbase
db.connect()
  .then((mongo: typeof mongoose | boolean) => {
    if (mongo) {
      console.log('Database Connected');
    }
  })
  .catch((err: Error) => {
    console.log(`${err.name}: ${err.message}`);
  });

// Start the Health Checker
healthChecker(server);

// listen to port
const PORT = process.env.PORT;
try {
  server.listen(PORT || 3000, () => {
    console.log('Server Started');
  });
  server.once('error', (err) => {
    console.log(
      'There was an error starting the server in the error listener:',
      err,
    );
  });
} catch (e) {
  console.log('There was an error starting the server:', e);
}
