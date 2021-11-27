import { Schema } from 'mongoose';
import appendStatics from './statics';
import { cryptoPlugin } from '@plugins/db/plugins';
import type {
  IBlacklistedUser,
  IBlacklistedUserDoc,
  IBlacklistedUserModel,
} from './types';

const schema = new Schema<
  IBlacklistedUserDoc,
  IBlacklistedUserModel,
  IBlacklistedUser
>({
  _id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
    encrypt: true,
  },
  email: {
    type: String,
    required: true,
  },
  blacklisted_from: {
    type: Date,
    required: true,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
    required: true,
  },
  flagged_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

schema.plugin(
  cryptoPlugin<IBlacklistedUser, IBlacklistedUserDoc, IBlacklistedUserModel>(),
);
export default appendStatics(schema);
