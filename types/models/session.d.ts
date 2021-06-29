import User from './user';

interface Session {
  _id: string;
  ip: string;
  user_id: User['_id'];
  token_secret: string;
  issued_at: Date;
}

export default Session;
