import type { Document, Types } from 'mongoose';

export type ID<T extends Document> = T['_id'] | Types.ObjectId | T;
