import type { Document } from 'mongoose';

export default interface Credentials extends Document {
  _id: string;
  alias: string;
  client_id: string;
  client_secret: string;
  email: string;
}
