import { model } from 'mongoose';
import schema from './schema';
import type { ITemplateDoc, ITemplateModel } from './types';

export default model<ITemplateDoc, ITemplateModel>('Template', schema);
