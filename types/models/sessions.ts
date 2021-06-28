import User from './user';

interface Session {
  ip: string;
  sId: string;
  user_id: User['user_id'];
  token_secret: string;
  issued_at: Date;
}

export default Session;
