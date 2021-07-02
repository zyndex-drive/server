import type { Document } from 'mongoose';

export default interface policy extends Document {
  _id: string;
  name: string;
  message: string;
  global_flag: boolean;
}
