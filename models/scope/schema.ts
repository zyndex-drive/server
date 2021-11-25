import { Schema } from 'mongoose';
import appendStatics from './statics';
import type { IScope, IScopeDoc, IScopeModel } from './types';

const schema = new Schema<IScopeDoc, IScopeModel, IScope>({
  _id: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  added_at: {
    type: Number,
    required: true,
    default: Date.now,
  },
  drive_id: {
    type: String,
    required: true,
    unique: true,
  },
  disallowed_frontends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Frontend',
    },
  ],
  related_to: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Credential',
    },
  ],
});

export default appendStatics(schema);
