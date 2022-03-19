import { Schema } from 'mongoose';
import appendStatics from './statics';
import { base64EncodePlugin } from '@plugins/db/plugins';

// Types
import type { ITemplate, ITemplateDoc, ITemplateModel } from './types';

const schema = new Schema<ITemplateDoc, ITemplateModel, ITemplate>({
  _id: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
    base64encode: true,
  },
});

schema.plugin(base64EncodePlugin<ITemplate, ITemplateDoc, ITemplateModel>());
export default appendStatics(schema);
