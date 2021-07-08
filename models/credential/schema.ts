import { Schema } from 'mongoose';
import type { ICredentials, ICredentialsModel } from './types';

export default new Schema<ICredentials, ICredentialsModel>({
  _id: {
    type: String,
  },
  alias: {
    type: String,
    required: true,
  },
  client_id: {
    type: String,
    required: true,
  },
  client_secret: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});
