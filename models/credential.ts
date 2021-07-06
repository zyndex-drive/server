import { Schema, model } from 'mongoose';
import type { credential as CredsType } from '../types/models';

const credentialSchema = new Schema<CredsType>({
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

const Credentials = model<CredsType>('Credential', credentialSchema);
export default Credentials;
