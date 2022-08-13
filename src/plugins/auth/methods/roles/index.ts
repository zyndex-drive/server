import { Roles } from '@models';
import { AuthModelMethods } from '@plugins/auth/helpers';
import { roles as rolePolicies } from '@plugins/templates/policies';
import { NotAllowed } from '@plugins/errors';

import type { IRole, IRoleDoc, IRoleLeanDoc, IRoleModel } from '@models/types';
import type { UpdateQuery } from 'mongoose';

const policyMap = {
  view: [rolePolicies.view],
  add: [rolePolicies.add],
  edit: [rolePolicies.edit],
  remove: [rolePolicies.remove],
};

const authCheckFunctions = {
  add: (data: IRole) => {
    if (data.type !== 'main') {
      return {
        check: true,
      };
    } else {
      return {
        check: false,
        error: new NotAllowed(
          'Not Allowed to Perform Any Action Against main documents other than predefined documents',
        ),
      };
    }
  },
  edit: (
    data: IRoleDoc | IRoleLeanDoc,
    modifiedData: UpdateQuery<IRoleDoc>,
  ) => {
    if (modifiedData.type) {
      if (data.type !== modifiedData.type) {
        return {
          check: false,
          error: new NotAllowed(
            'Not Allowed to Perform Any Action Against main documents other than predefined documents',
          ),
        };
      } else {
        return {
          check: true,
        };
      }
    } else {
      return {
        check: true,
      };
    }
  },
  remove: (data: IRoleDoc | IRoleLeanDoc) => {
    if (data.type !== 'main') {
      return {
        check: true,
      };
    } else {
      return {
        check: false,
        error: new NotAllowed(
          'Not Allowed to Perform Any Action Against main documents other than predefined documents',
        ),
      };
    }
  },
};

const roleAuthMethods = new AuthModelMethods<
  IRole,
  IRoleDoc,
  IRoleLeanDoc,
  IRoleModel
>(Roles, true, policyMap, authCheckFunctions);

export default roleAuthMethods.createAllFunctions();
