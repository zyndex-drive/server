import mongoose from 'mongoose';

export default {
  connect: async (): Promise<typeof mongoose | boolean> => {
    const url = process.env['DBURL'];
    if (url) {
      const connection = await mongoose
        .connect(url, {
          useUnifiedTopology: true,
          bufferCommands: false,
          bufferMaxEntries: 0,
          useNewUrlParser: true,
          useCreateIndex: true,
        })
        .then((dbconnection) => dbconnection);
      return connection;
    }
    return false;
  },
  close: (): void => {
    mongoose.connection
      .close()
      .then(() => {
        console.log('Successfully Closed the Database Connection');
      })
      .catch(() => {
        console.log('Failed to Close Database Connection');
      });
  },
};
