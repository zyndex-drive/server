import type { Document, ObjectId } from 'mongoose';

export default interface PendingUser extends Document {
  _id: string;
  name: string;
  email: string;
  message: string;
  role: ObjectId; // Role Collection - ObjectID
  scopes: ObjectId[]; // Scope Collection - ObjectID
  requested_at: Date;
}
