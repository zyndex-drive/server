import { Schema } from 'mongoose';
import appendStatics from './statics';
import { cryptoPlugin } from '@plugins/db/plugins';
import type { IToken, ITokenDoc, ITokenModel } from './types';

const schema = new Schema<ITokenDoc, ITokenModel, IToken>({
  _id: {
    type: Schema.Types.ObjectId,
  },
  token: {
    type: String,
    required: true,
    encrypt: true,
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
    type: Number,
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

schema.plugin(cryptoPlugin<IToken, ITokenDoc, ITokenModel>());
export default appendStatics(schema);
