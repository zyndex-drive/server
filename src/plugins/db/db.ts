import mongoose from 'mongoose';

export default {
  connect: async (): Promise<typeof mongoose> => {
    const prodURL = process.env['DBURL'];
    const testURL = process.env['DBURL_TESTING'];
    const dbUrl = process.env.NODE_ENV === 'production' ? prodURL : testURL;
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
    console.log('Successfully Closed the Database Connection');
  },
  reset: async (): Promise<void> => {
    await mongoose.connection.dropDatabase();
  },
};
