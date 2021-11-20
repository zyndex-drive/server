import { Schema } from 'mongoose';
import appendStatics from './statics';
import type { IPolicyDoc, IPolicyModel } from './types';

const schema = new Schema<IPolicyDoc, IPolicyModel>({
  _id: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  global_flag: {
    type: Boolean,
    required: true,
  },
  allowed_roles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Role',
    },
  ],
});

export default appendStatics(schema);
