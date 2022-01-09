// Initialization
import dotenv from 'dotenv';

// Import Server and Database
import { server, db } from '@plugins';

// Health Check Service
import { healthCheckService } from '@plugins/server/helpers';

// Load ENV Variables to the Process
dotenv.config();

// Start the Health Checker Service
healthCheckService(server);

// Create Server and Listen on PORT
const PORT = process.env.PORT || 3000;
try {
  server.listen(PORT, () => {
    console.log(`Server Started on Port: ${PORT}`);
    console.log('Connecting to Database.....');

    // Connect to Datbase
    db.connect()
      .then(() => {
        console.log('Database Connected...OK..');
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
