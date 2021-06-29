import { Schema, model } from 'mongoose';
import { scope as ScopeType } from '../types/models';

const ScopeSchema = new Schema<ScopeType>({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  added_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  related_to: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Credential',
    },
  ],
});

const Scopes = model('Scope', ScopeSchema);
export default Scopes;
