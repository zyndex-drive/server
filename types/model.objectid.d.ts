import type { Document } from 'mongoose';

export type ID<T = Document<T>> = T['_id'] | T;
