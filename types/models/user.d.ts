import type { Document, ObjectId } from 'mongoose';

export default interface User extends Document {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  registered_at: Date;
  verified_at: Date;
  token_hash: string;
  restricted: boolean;
  role: [
    {
      scope: ObjectId; // Scope Collection - ObjectID
      role: ObjectId; // Role Collection - ObjectID
    },
  ];
  password: string;
  allowed_policies: ObjectId[]; // Policy Collection - ObjectID
  disallowed_policies: ObjectId[]; // Policy Collection - ObjectID
}
