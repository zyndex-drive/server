import type { Document, Types } from 'mongoose';
import type { IBaseModel } from '../types';
import type { IGlobalSettingsDoc } from '@models/global-setting/types';
import type { ISMTPMailerDoc } from '@models/smtp-mailer/types';
import type { IRoleDoc } from '@models/role/types';
import type { IPolicyDoc } from '@models/policy/types';
import type { ID } from '@typs/model.objectid';

export interface IFrontend {
  _id: Types.ObjectId;
  domain: string;
  name: string;
  settings: {
    specifics: [
      {
        setting: ID<IGlobalSettingsDoc>;
        flag: boolean | string | number;
      },
    ];
    default_mailer?: ID<ISMTPMailerDoc>;
    disallowed_roles: ID<IRoleDoc>[];
    allowed_policies: ID<IPolicyDoc>[];
    disallowed_policies: ID<IPolicyDoc>[];
  };
}

export interface IFrontendDoc extends IFrontend, Document {}

export interface IFrontendModel extends IBaseModel<IFrontend, IFrontendDoc> {
  getFrontendUrls: (this: IFrontendModel) => Promise<IFrontendDoc[]>;
}
