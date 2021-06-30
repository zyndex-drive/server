import Policy from './policy';

export default interface role {
  _id: string;
  name: string;
  delgates_from: string &
    ('Viewer' | 'Content Manager' | 'Moderator' | 'Owner');
  alias: string;
  max_sessions: number;
  allowed_policies: Policy['_id'][];
  disallowed_policies: Policy['_id'][];
}
