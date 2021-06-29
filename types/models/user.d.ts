import Roles from './roles';
import Scopes from './scope';

interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  registered_at: Date;
  scopes: Scopes['_id'][];
  verified_at: Date;
  token_hash: string;
  restricted: boolean;
  role: Roles;
  password: string;
}

export default User;
