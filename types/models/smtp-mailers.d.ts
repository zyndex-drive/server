import SmtpProvider from './smtp-providers';

export default interface SmtpMailers {
  _id: string;
  name: string;
  email: string;
  password: string;
  type: string & ('gmail' | 'others');
  provider: SmtpProvider['_id'];
  gmail_data: Record<string, string | number | boolean>[];
}
