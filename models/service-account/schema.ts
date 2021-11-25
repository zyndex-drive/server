import { Schema } from 'mongoose';
import appendStatics from './statics';
import { cryptoPlugin } from '@plugins/db/plugins';
import type { IServiceAcc, IServiceAccDoc, IServiceAccModel } from './types';

const schema = new Schema<IServiceAccDoc, IServiceAccModel, IServiceAcc>({
  _id: {
    type: Schema.Types.ObjectId,
  },
  project_id: {
    type: String,
    required: true,
  },
  unique_id: {
    type: String,
    required: true,
  },
  private_key: {
    id: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
      encrypt: true,
    },
  },
  client: {
    id: {
      type: String,
      required: true,
      encrypt: true,
    },
    email: {
      type: String,
      required: true,
      encrypt: true,
    },
  },
  related_to: {
    type: Schema.Types.ObjectId,
    ref: 'Credential',
    required: true,
  },
});

schema.plugin(cryptoPlugin<IServiceAcc, IServiceAccDoc, IServiceAccModel>());
export default appendStatics(schema);
