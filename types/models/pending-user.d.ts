import type Roles from './role';
import type Scopes from './scope';

export default interface PendingUser {
  _id: string;
  name: string;
  email: string;
  role: Roles['_id'];
  scopes: Scopes['_id'][];
  requested_at: Date;
}
