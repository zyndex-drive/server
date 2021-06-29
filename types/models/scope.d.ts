import credentials from './credentials';

interface scope {
  _id: string;
  name: string;
  added_at: Date;
  related_to: credentials['_id'][];
}

export default scope;
