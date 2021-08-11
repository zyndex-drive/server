import type { Document } from 'mongoose';

export type ID<T extends Document<T>> = T['_id'] | T;
