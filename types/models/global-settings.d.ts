import type { Document } from 'mongoose';

export default interface globalSettings extends Document {
  _id: string;
  name: string;
  message: string;
  global_flag: boolean | string | number;
}
