import { Schema } from 'mongoose';
import appendStatics from './statics';
import type { IPolicy, IPolicyDoc, IPolicyModel } from './types';

const schema = new Schema<IPolicyDoc, IPolicyModel, IPolicy>({
  _id: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  message: {
    type: String,
    required: true,
  },
  global_flag: {
    type: Boolean,
    required: true,
  },
});

export default appendStatics(schema);
