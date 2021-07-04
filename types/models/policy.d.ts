import type { Document } from 'mongoose';

export interface policySchema {
  name: string;
  message: string;
  global_flag: boolean;
}

export default interface policy extends Document, policySchema {
  _id: string;
}
