import type Roles from './roles';
import type Scopes from './scope';

interface PendingUser {
  name: string;
  email: string;
  role: Roles;
  scope: Scopes['scope_id'][];
  requested_at: Date;
}

export default PendingUser;
