import { Schema } from 'mongoose';
import type { IScopeDoc } from './types';

export default new Schema<IScopeDoc>({
  _id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  added_at: {
    type: Date,
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
