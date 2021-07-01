import { Schema, model } from 'mongoose';
import { policy as PolicyType } from '../types/models';

const policySchema = new Schema<PolicyType>({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  pcy_name: {
    type: String,
    required: true,
  },
  pcy_message: {
    type: String,
    required: true,
  },
  global_flag: {
    type: Boolean,
    required: true,
  },
});

const Policies = model('Policy', policySchema);
export default Policies;
