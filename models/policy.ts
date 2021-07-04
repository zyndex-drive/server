import { Schema, model } from 'mongoose';
import type { policy as PolicyType } from '../types/models';

const policySchema = new Schema<PolicyType>({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  global_flag: {
    type: Boolean,
    required: true,
  },
});

const Policies = model<PolicyType>('Policy', policySchema);
export default Policies;
