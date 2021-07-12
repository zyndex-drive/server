import { Schema } from 'mongoose';
import { createPolicy, clearCollection } from './statics';
import type { IPolicy, IPolicyModel } from './types';

const schema = new Schema<IPolicy, IPolicyModel>({
  _id: {
    type: String,
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

schema.statics.createPolicy = createPolicy;
schema.statics.clearCollection = clearCollection;

export default schema;
