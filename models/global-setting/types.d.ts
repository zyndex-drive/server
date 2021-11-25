import type { Document, Types } from 'mongoose';
import type { IBaseModel } from '../types';
import type { ISMTPMailerDoc } from '@models/smtp-mailer/types';
import type { ISMTPProviderDoc } from '@models/smtp-provider/types';
import type { ID } from '@typs/model.objectid';

type OTHER = boolean | string | number;

export interface IGlobalSettings {
  _id: Types.ObjectId;
  name: string;
  message: string;
  global_flag: OTHER | ID<ISMTPMailerDoc> | ID<ISMTPProviderDoc>;
  reference?: 'SMTPMailer' | 'SMTPProvider';
}

export interface IGlobalSettingsDoc extends IGlobalSettings, Document {}

export interface IGlobalSettingsModel extends IBaseModel<IGlobalSettingsDoc> {}
