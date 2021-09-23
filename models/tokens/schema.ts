import { Schema } from 'mongoose';
import { createDoc, clearAll } from './statics';
import type { IToken, ITokenModel } from './types';

const schema = new Schema<IToken, ITokenModel>({
  _id: {
    type: Schema.Types.ObjectId,
  },
  token: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  related_to: {
    type: Schema.Types.ObjectId || String,
    refPath: 'ref_model',
  },
  ref_model: {
    type: String,
    enum: ['Credential', 'ServiceAccount'],
  },
  expires_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
  scopes: [{ type: String, required: true }],
  website: {
    type: String,
    required: true,
  },
  additional_tokens: [
    {
      type: {
        type: String,
      },
      token: {
        type: String,
      },
    },
  ],
});

schema.statics.createDoc = createDoc;
schema.statics.clearAll = clearAll;

export default schema;
