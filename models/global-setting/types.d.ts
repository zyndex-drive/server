import type { Document, Types, LeanDocument } from 'mongoose';
import type { IBaseModel } from '../types';
import type { ISMTPProviderDoc, ISMTPMailerDoc } from '@models/types';
import type { ID } from '@typs/model.objectid';

type OTHER = boolean | string | number;

export interface IGlobalSettings {
  _id: Types.ObjectId;
  code: string;
  name: string;
  message: string;
  global_flag: OTHER | ID<ISMTPMailerDoc> | ID<ISMTPProviderDoc>;
  reference?: 'SMTPMailer' | 'SMTPProvider' | 'MailTemplates';
}

export interface IGlobalSettingsDoc extends IGlobalSettings, Document {}

export interface IGlobalSettingsModel extends IBaseModel<IGlobalSettingsDoc> {}

export type IGlobalSettingsLeanDoc = LeanDocument<IGlobalSettingsDoc>;
