import type { Document, ObjectId } from 'mongoose';

export default interface serviceAccount extends Document {
  _id: string;
  project_id: string;
  private_key: {
    id: string;
    key: string;
  };
  client: {
    id: string;
    email: string;
  };
  related_to: ObjectId; // Credential Collection - ObjectID
}
