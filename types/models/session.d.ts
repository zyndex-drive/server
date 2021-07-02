import type { Document, ObjectId } from 'mongoose';

export default interface Session extends Document {
  _id: string;
  ip: string;
  user_id: ObjectId; // User Collection - ObjectID
  frontend: ObjectId; // Frontend Collection - ObjectID
  token_secret: string;
  issued_at: Date;
}
