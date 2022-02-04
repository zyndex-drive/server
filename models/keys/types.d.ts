import type { Document, Types, LeanDocument } from 'mongoose';
import type { IBaseModel } from '../types';
import type { JWK } from 'jose';

export interface IKey {
  _id: Types.ObjectId;
  type: string;
  key: JWK;
}

export interface IKeyDoc extends IKey, Document {}

export interface IKeyModel extends IBaseModel<IKeyDoc> {}

export type IKeyLeanDoc = LeanDocument<IKeyDoc>;
