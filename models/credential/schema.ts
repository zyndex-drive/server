import { Schema } from 'mongoose';
import { createDoc, clearAll, checkID } from './statics';
import type { ICredentials, ICredentialsModel } from './types';

const schema = new Schema<ICredentials, ICredentialsModel>({
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

schema.statics.createDoc = createDoc;
schema.statics.clearAll = clearAll;
schema.statics.checkID = checkID;

export default schema;
