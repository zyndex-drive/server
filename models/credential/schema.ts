import { Schema } from 'mongoose';
import appendStatics from './statics';
import type { ICredentialsDoc, ICredentialsModel } from './types';

const schema = new Schema<ICredentialsDoc, ICredentialsModel>({
  _id: {
    type: Schema.Types.ObjectId,
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
  redirect_uri: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

export default appendStatics(schema);
