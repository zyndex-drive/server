import type { Document, ObjectId } from 'mongoose';

export default interface SmtpMailers extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  type: string & ('gmail' | 'others');
  provider: ObjectId; // SMTPProvider Collection - ObjectID
  gmail_data?: Record<string, string | number | boolean>;
}
