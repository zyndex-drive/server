import mongoose from 'mongoose';

import type { Error as MongoError } from 'mongoose';

export default {
  connect: (): Promise<typeof mongoose> =>
    new Promise<typeof mongoose>((resolve, reject) => {
      const prodURL = process.env['DBURL'];
      const testURL = process.env['DBURL_TESTING'];
      const dbUrl = process.env.NODE_ENV === 'production' ? prodURL : testURL;
      if (dbUrl) {
        mongoose
          .connect(dbUrl, {
            useUnifiedTopology: true,
            bufferCommands: false,
            bufferMaxEntries: 0,
            useNewUrlParser: true,
            useCreateIndex: true,
          })
          .then(resolve)
          .catch((err: MongoError) => {
            reject(new Error(`${err.name}: ${err.message}`));
          });
      } else {
        reject(
          new Error('No Database URL is Found in the Environment Variables'),
        );
      }
    }),
  close: (): Promise<void> =>
    new Promise<void>((resolve, reject) => {
      mongoose.connection
        .close()
        .then(() => {
          console.log('Successfully Closed the Database Connection');
          resolve();
        })
        .catch((err: MongoError) => {
          reject(new Error(`${err.name}: ${err.message}`));
        });
    }),
  reset: (): Promise<void> =>
    new Promise<void>((resolve, reject) => {
      mongoose.connection
        .dropDatabase()
        .then(resolve)
        .catch((err: MongoError) => {
          reject(new Error(`${err.name}: ${err.message}`));
        });
    }),
};
