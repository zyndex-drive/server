import type { Document, Types, LeanDocument } from 'mongoose';
import type { IBaseModel } from '../types';
import type { IPolicyDoc, IGlobalSettingsDoc } from '@models/types';
import type { ID } from '@typs/model.objectid';
import type { IInlineResponse } from '@typs/inline.response';

export interface IRole {
  _id: Types.ObjectId;
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

export interface IRoleModel extends IBaseModel<IRoleDoc> {
  /**
   * Checks the Predefined map of Roles with the Docs present in Database
   *
   * @returns {Promise<IInlineResponse<boolean>>} - Response whether map is matching or not
   */
  mapCheck: (this: IRoleModel) => Promise<IInlineResponse<boolean>>;
}

export type IRoleLeanDoc = LeanDocument<IRoleDoc>;
