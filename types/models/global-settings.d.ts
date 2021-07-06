import type { Document, ObjectId } from 'mongoose';

export interface globalSettingSchema {
  _id: string;
  name: string;
  message: string;
  global_flag: boolean | string | number;
  reference?: 'SMTPMailer' | 'SMTPProvider';
}

export default interface globalSettings extends globalSettingSchema, Document {
  global_flag: boolean | string | number | ObjectId; // SMTP Mailer or SMTP Provider Collection - ObjectID
}
