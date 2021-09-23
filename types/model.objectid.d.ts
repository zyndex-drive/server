import type { Document, Types } from 'mongoose';

export type ID<T extends Document<T>> = T['_id'] | Types.ObjectId | T;
