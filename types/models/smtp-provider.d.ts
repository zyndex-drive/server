import type { Document } from 'mongoose';

export default interface SmtpProviders extends Document {
  _id: string;
  name: string;
  alias: string;
  smtp: {
    url: string;
    port: number;
  };
  imap: {
    url: string;
    port: number;
  };
  dkim_key: string | undefined;
}
