import Roles from './role';
import Scopes from './scope';
import Policy from './policy';

export default interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  registered_at: Date;
  verified_at: Date;
  scopes: Scopes['_id'][];
  token_hash: string;
  restricted: boolean;
  role: Roles['_id'];
  password: string;
  allowed_policies: Policy['_id'][];
  disallowed_policies: Policy['_id'][];
}
