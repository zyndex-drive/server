// Initialization
import dotenv from 'dotenv';

// Server
import server from '@plugins/server';

// Database
import db from '@plugins/db';

// Health Check Service
import { healthCheckService } from '@plugins/server/helpers';

// Load ENV Variables to the Process
dotenv.config();

// Start the Health Checker Service
healthCheckService(server);

// Create Server and Listen on PORT
const PORT = process.env.PORT;
try {
  server.listen(PORT || 3000, () => {
    console.log('Server Started');
    console.log('Connecting to Database');

    // Connect to Datbase
    db.connect()
      .then(() => {
        console.log('Database Connected');
      })
      .catch((err: string) => {
        console.log(err);
        server.close();
      });
  });
  server.once('error', (err) => {
    console.log(
      'There was an error starting the server in the error listener:',
      err,
    );
    server.close();
  });
} catch (e) {
  console.log('There was an error starting the server:', e);
  server.close();
}
