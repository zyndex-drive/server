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
    return new Promise<boolean>((resolve) => resolve(false));
  },
  close: (): Promise<void> =>
    new Promise<void>((resolve, reject) => {
      mongoose.connection
        .close()
        .then(() => {
          console.log('Successfully Closed the Database Connection');
          resolve();
        })
        .catch(() => {
          reject(new Error('Failed to Close Database Connection'));
        });
    }),
};
