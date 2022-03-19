// Initialization
import dotenv from 'dotenv';

// Import Server
import { server } from '@plugins';

// Load ENV Variables to the Process
dotenv.config();

// Create Server and Start the Server
const PORT = process.env.PORT || 3000;

server.start(PORT);
