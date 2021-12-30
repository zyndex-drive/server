import { Schema } from 'mongoose';
import appendStatics from './statics';
import { cryptoPlugin, hashPlugin } from '@plugins/db/plugins';
import type { IUser, IUserDoc, IUserModel } from './types';

const schema = new Schema<IUserDoc, IUserModel, IUser>({
  _id: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
    encrypt: true,
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
  verified_at: {
    type: Number,
    required: true,
  },
  token_hash: {
    type: String,
    required: true,
    encrypt: true,
  },
  restricted: {
    type: Boolean,
    default: false,
  },
  roles: [
    {
      scope: {
        type: Schema.Types.ObjectId,
        ref: 'Scope',
        required: true,
      },
      role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
      },
    },
  ],
  password: {
    type: String,
    hash: true,
  },
  allowed_policies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Policy',
    },
  ],
  disallowed_policies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Policy',
    },
  ],
});

schema.plugin(cryptoPlugin<IUser, IUserDoc, IUserModel>());
schema.plugin(hashPlugin<IUser, IUserDoc, IUserModel>());

export default appendStatics(schema);
