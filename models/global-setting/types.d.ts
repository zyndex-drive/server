import type { Document, Model, Types } from 'mongoose';
import type { ISMTPMailerDoc } from '@models/smtp-mailer/types';
import type { ISMTPProviderDoc } from '@models/smtp-provider/types';
import type { ID } from '@typs/model.objectid';
import type { IInlineResponse } from '@typs/inline.response';

type OTHER = boolean | string | number;

export interface IGlobalSettings {
  _id: Types.ObjectId;
  name: string;
  message: string;
  global_flag: OTHER | ID<ISMTPMailerDoc> | ID<ISMTPProviderDoc>;
  reference?: 'SMTPMailer' | 'SMTPProvider';
}

export interface IGlobalSettingsDoc extends IGlobalSettings, Document {}

export interface IGlobalSettingsModel extends Model<IGlobalSettingsDoc> {
  createDoc: (this: IGlobalSettingsModel) => Promise<IGlobalSettingsDoc[]>;
  clearAll: (this: IGlobalSettingsModel) => Promise<IInlineResponse<string>>;
}
