import type { Document, Model } from 'mongoose';
import type { IGlobalSettingsDoc } from '@models/global-setting/types';
import type { IPolicyDoc } from '@models/policy/types';
import type { ID } from '@typs/model.objectid';
import type { IInlineResponse } from '@typs/inline.response';

export interface IRole {
  _id: string;
  name: string;
  alias: string;
  type: string & ('main' | 'sub');
  delgates_from?: ID<IRoleDoc>;
  parent_role?: ID<IRoleDoc>;
  child_role?: ID<IRoleDoc>;
  max_sessions?: number;
  allowed_policies: ID<IPolicyDoc>[];
  disallowed_policies?: ID<IPolicyDoc>[];
  specific_settings?: {
    setting: ID<IGlobalSettingsDoc>;
    flag: boolean | string | number;
  }[];
}

export interface IRoleDoc extends IRole, Document {}

export interface IRoleModel extends Model<IRoleDoc> {
  createDoc: (this: IRoleModel, doc: IRole) => Promise<IRoleDoc>;
  clearAll: (this: IRoleModel) => Promise<IInlineResponse<string>>;
  mapCheck: (this: IRoleModel) => Promise<IInlineResponse<boolean>>;
}
