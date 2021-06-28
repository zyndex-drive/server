import Roles from './roles';
import Scopes from './scope';

interface User {
  name: string;
  user_id: string;
  email: string;
  avatar: string;
  registered_at: Date;
  scope: Scopes['scope_id'][];
  verified_at: Date;
  token_hash: string;
  restricted: boolean;
  role: Roles;
  password: string;
}

export default User;
