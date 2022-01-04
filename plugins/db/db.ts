import mongoose from 'mongoose';

import type { Error as MongoError } from 'mongoose';

export default {
  connect: (): Promise<typeof mongoose> =>
    new Promise<typeof mongoose>((resolve, reject) => {
      const url = process.env['DBURL'];
      if (url) {
        mongoose
          .connect(url, {
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
};
