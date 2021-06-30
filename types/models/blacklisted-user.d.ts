import User from './user';
import Roles from './role';

export default interface blacklistedUser {
  _id: User['_id'];
  name: string;
  email: string;
  blacklisted_at: Date;
  role: Roles['_id'];
  flagged_by: User['_id'];
}
