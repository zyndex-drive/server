import type { Document, ObjectId } from 'mongoose';

export interface roleSchema {
  _id: string;
  name: string;
  alias: string;
  type: string & ('main' | 'sub');
  delgates_from?: string;
  parent_role?: string;
  child_role?: string;
  max_sessions?: number;
  allowed_policies: string[];
  disallowed_policies?: string[];
  specific_settings?: {
    setting: string;
    flag: boolean | string | number;
  }[];
}

export default interface role extends roleSchema, Document {
  delegates_from?: ObjectId; // This Collection - Type - Main only - ObjectID
  parent_role?: ObjectId; // This Collection - Type - Main only - ObjectID
  child_role?: ObjectId; // This Collection - Type - Main only - ObjectID
  allowed_policies?: ObjectId[]; // Policy Collection - ObjectID
  disallowed_policies?: ObjectId[]; // Policy Collection - ObjectID
  specific_settings?: {
    setting: ObjectId; // GlobalSettings Collection - ObjectID
    flag: boolean | string | number;
  };
}
