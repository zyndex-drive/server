import type Roles from './roles';
import type Scopes from './scope';

interface PendingUser {
  _id: string;
  name: string;
  email: string;
  role: Roles;
  scopes: Scopes['_id'][];
  requested_at: Date;
}

export default PendingUser;
