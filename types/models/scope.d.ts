import credentials from './credential';

export default interface scope {
  _id: string;
  name: string;
  added_at: Date;
  related_to: credentials['_id'][];
}
