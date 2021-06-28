import { Schema, model } from 'mongoose';
import { user as UserType } from '../types/models';

const UserSchema = new Schema<UserType>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    lowercase: true,
  },
  registered_at: {
    type: Number,
    required: true,
    default: Date.now,
  },
  token_hash: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: null,
  },
  temp_password: {
    type: String,
  },
  restricted: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    required: true,
    default: 'User',
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const User = model('User', UserSchema);

export default User;
