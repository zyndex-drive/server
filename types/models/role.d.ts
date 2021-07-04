import type { Document, ObjectId } from 'mongoose';

export default interface role extends Document {
  _id: string;
  name: string;
  alias: string;
  type: string & ('main' | 'sub');
  delgates_from: ObjectId | null; // This Collection - Type - Main only - ObjectID
  max_sessions: number;
  allowed_policies: ObjectId[]; // Policy Collection - ObjectID
  disallowed_policies: ObjectId[]; // Policy Collection - ObjectID
  specific_settings: {
    setting: ObjectId; // GlobalSettings Collection - ObjectID
    flag: boolean | string | number;
  }[];
}
