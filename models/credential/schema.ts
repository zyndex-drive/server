import { Schema } from 'mongoose';
import type { ICredentialsDoc } from './types';

export default new Schema<ICredentialsDoc>({
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
