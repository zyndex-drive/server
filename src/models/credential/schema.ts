import { Schema } from 'mongoose';
import appendStatics from './statics';
import { cryptoPlugin } from '@plugins/db/plugins';
import type { ICredentials, ICredentialsDoc, ICredentialsModel } from './types';

const schema = new Schema<ICredentialsDoc, ICredentialsModel, ICredentials>({
  _id: {
    type: Schema.Types.ObjectId,
  },
  alias: {
    type: String,
    required: true,
    encrypt: true,
  },
  client_id: {
    type: String,
    required: true,
    encrypt: true,
  },
  client_secret: {
    type: String,
    required: true,
    encrypt: true,
  },
  redirect_uri: [
    {
      type: {
        type: String,
        required: true,
      },
      uri: {
        type: String,
        required: true,
      },
    },
  ],
  type: {
    type: String,
    required: true,
  },
  login: {
    type: Boolean,
    required: true,
    default: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

schema.plugin(cryptoPlugin<ICredentials, ICredentialsDoc, ICredentialsModel>());
export default appendStatics(schema);
