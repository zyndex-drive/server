import { Schema } from 'mongoose';
import appendStatics from './statics';
import type { IServiceAccDoc, IServiceAccModel } from './types';

const schema = new Schema<IServiceAccDoc, IServiceAccModel>({
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
    },
  },
  client: {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  related_to: {
    type: Schema.Types.ObjectId,
    ref: 'Credential',
    required: true,
  },
});

export default appendStatics(schema);
