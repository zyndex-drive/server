import type { Document, Types } from 'mongoose';
import type { IBaseModel } from '../types';
import type { IFrontendDoc } from '@models/frontend/types';
import type { ICredentialsDoc } from '@models/credential/types';
import type { ID } from '@typs/model.objectid';

export interface IScope {
  _id: Types.ObjectId;
  name: string;
  added_at: number;
  drive_id: string;
  disallowed_frontends?: ID<IFrontendDoc>[];
  related_to: ID<ICredentialsDoc>[];
}

export interface IScopeDoc extends IScope, Document {}

export interface IScopeModel extends IBaseModel<IScope, IScopeDoc> {}
