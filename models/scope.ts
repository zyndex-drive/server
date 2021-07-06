import { Schema, model } from 'mongoose';
import type { scope as ScopeType } from '../types/models';

const ScopeSchema = new Schema<ScopeType>({
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

const Scopes = model<ScopeType>('Scope', ScopeSchema);
export default Scopes;
