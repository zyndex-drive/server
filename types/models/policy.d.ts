import type { Document } from 'mongoose';

export interface policySchema {
  _id: string;
  name: string;
  message: string;
  global_flag: boolean;
}

export default interface policy extends Document, policySchema {}
