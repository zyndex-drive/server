import type { Document, Model } from 'mongoose';
import type { IGlobalSettingsDoc } from '@models/global-setting/types';
import type { ISMTPMailerDoc } from '@models/smtp-mailer/types';
import type { IRoleDoc } from '@models/role/types';
import type { IPolicyDoc } from '@models/policy/types';
import type { ID } from '@typs/model.objectid';
import type { IInlineResponse } from '@typs/inline.response';

export interface IFrontend {
  _id: string;
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

export interface IFrontendModel extends Model<IFrontendDoc> {
  getFrontendUrls: (this: IFrontendModel) => Promise<IFrontendDoc[]>;
  createDoc: (this: IFrontendModel) => Promise<IFrontendDoc[]>;
  clearAll: (this: IFrontendModel) => Promise<IInlineResponse<string>>;
}
