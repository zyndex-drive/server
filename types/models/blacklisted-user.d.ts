import type { Document, ObjectId } from 'mongoose';

export default interface blacklistedUser extends Document {
  _id: ObjectId; // User Collection - ObjectID
  name: string;
  email: string;
  blacklisted_from: Date;
  role: ObjectId; // Role Collection - ObjectID
  flagged_by: ObjectId; // User Collection - ObjectID
}
