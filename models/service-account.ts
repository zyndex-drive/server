import { Schema, model } from 'mongoose';
import type { serviceAccount as ServiceAccType } from '../types/models';

const sacSchema = new Schema<ServiceAccType>({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  project_id: {
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

const ServiceAccs = model<ServiceAccType>('ServiceAccounts', sacSchema);
export default ServiceAccs;
