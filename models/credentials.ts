import { Schema, model } from 'mongoose';
import { credential as CredsType } from '../types/models';

const credentialSchema = new Schema<CredsType>({
  _id: {
    type: String,
    required: true,
    unique: true,
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
  },
});

const Credentials = model('Credential', credentialSchema);
export default Credentials;
