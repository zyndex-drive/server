import { Schema } from 'mongoose';
import { createDoc, clearAll, checkID } from './statics';
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

schema.statics.createDoc = createDoc;
schema.statics.clearAll = clearAll;
schema.statics.checkID = checkID;

export default schema;
