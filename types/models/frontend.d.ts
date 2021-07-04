import type { Document, ObjectId } from 'mongoose';

export default interface frontend extends Document {
  _id: string;
  domain: string;
  name: string;
  settings: {
    globals: ObjectId[]; // GlobalSettings Collection - ObjectID;
    specifics: [
      {
        setting: ObjectId; // GlobalSettings Collection - ObjectID
        flag: boolean | string | number;
      },
    ];
    default_mailer: ObjectId; // SMTP Mailer Collection - ObjectID
    disallowed_roles: ObjectId; // Role Collection - ObjectID
    allowed_policies: ObjectId[]; // Policy Collection - ObjectID
    disallowed_policies: ObjectId[]; // Policy Collection - ObjectID;
  };
}
