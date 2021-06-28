import Roles from './roles';

interface User {
  name: string;
  user_id: string;
  email: string;
  avatar: string;
  registered_at: Date;
  temp_password: string;
  restricted: boolean;
  verified: boolean;
  role: Roles;
  password: string;
}

export default User;
