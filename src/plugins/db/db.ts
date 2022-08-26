import mongoose from 'mongoose';
import { logger } from '@plugins';

export default {
  connect: async (): Promise<typeof mongoose> => {
    const prodURL = process.env['DBURL'];
    const testURL = process.env['DBURL_TESTING'];
    const dbUrl = process.env.NODE_ENV === 'development' ? testURL : prodURL;
    if (dbUrl) {
      const connection = await mongoose.connect(dbUrl, {
        useUnifiedTopology: true,
        bufferCommands: false,
        bufferMaxEntries: 0,
        useNewUrlParser: true,
        useCreateIndex: true,
      });
      return connection;
    } else {
      throw new Error('No Database URL is Found in the Environment Variables');
    }
  },
  close: async (): Promise<void> => {
    await mongoose.connection.close();
    logger.info('Successfully Closed the Database Connection');
  },
  reset: async (): Promise<void> => {
    await mongoose.connection.dropDatabase();
    logger.warning(
      'Complete Database has been Dropped, Kindly Restart the Server to Initialize & Continue',
    );
  },
};
