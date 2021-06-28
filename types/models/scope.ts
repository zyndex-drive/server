import credentials from './credentials';

interface scope {
  name: string;
  scope_id: string;
  added_at: Date;
  related_to: credentials['cred_id'][];
}

export default scope;
