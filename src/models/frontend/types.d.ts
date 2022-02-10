import type { Document, Types, LeanDocument } from 'mongoose';
import type { IBaseModel } from '../types';
import type {
  IPolicyDoc,
  IRoleDoc,
  ISMTPMailerDoc,
  IGlobalSettingsDoc,
} from '@models/types';
import type { ID } from '@typs/model.objectid';

export interface IFrontend {
  _id: Types.ObjectId;
  domain: string;
  name: string;
  settings?: {
    specifics: {
      setting: ID<IGlobalSettingsDoc>;
      flag: boolean | string | number;
    }[];
    default_mailer?: ID<ISMTPMailerDoc>;
    disallowed_roles: ID<IRoleDoc>[];
    allowed_policies: ID<IPolicyDoc>[];
    disallowed_policies: ID<IPolicyDoc>[];
  };
}

export interface IFrontendDoc extends IFrontend, Document {}

export interface IFrontendModel extends IBaseModel<IFrontendDoc> {
  /**
   * Get all the Frontend URL's From the Collection
   *
   * @returns {IFrontendDoc[]} list of frontend Data
   */
  getFrontendUrls: (
    this: IFrontendModel,
  ) => Promise<LeanDocument<IFrontendDoc>[]>;
}

export type IFrontendLeanDoc = LeanDocument<IFrontendDoc>;
