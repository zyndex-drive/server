import type { Document, Types } from 'mongoose';
import type { IBaseModel } from '../types';

export interface ITemplate {
  _id: Types.ObjectId;
  name: string;
  type: string;
  purpose: string;
  data: string;
}

export interface ITemplateDoc extends ITemplate, Document {}

export interface ITemplateModel extends IBaseModel<ITemplateDoc> {}
