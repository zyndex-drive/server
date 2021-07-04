import type { Document, ObjectId } from 'mongoose';

export default interface scope extends Document {
  _id: string;
  name: string;
  added_at: Date;
  drive_id: string;
  disallowed_frontends: ObjectId[]; // Frontend Collection - ObjectID
  related_to: ObjectId[]; // Credential Collection - ObjectID
}
