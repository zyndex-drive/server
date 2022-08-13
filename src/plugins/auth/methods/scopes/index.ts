import { Scopes } from '@models';
import { AuthModelMethods } from '@plugins/auth/helpers';
import { scopes as scopePolicies } from '@plugins/templates/policies';

import type {
  IScope,
  IScopeDoc,
  IScopeLeanDoc,
  IScopeModel,
} from '@models/types';

const policyMap = {
  view: [scopePolicies.view],
  add: [scopePolicies.add],
  edit: [scopePolicies.edit],
  remove: [scopePolicies.remove],
};

const defaultCheckFunction = () => ({ check: true });

const authCheckFunctions = {
  add: defaultCheckFunction,
  edit: defaultCheckFunction,
  remove: defaultCheckFunction,
};

const scopeAuthMethods = new AuthModelMethods<
  IScope,
  IScopeDoc,
  IScopeLeanDoc,
  IScopeModel
>(Scopes, true, policyMap, authCheckFunctions);

export default scopeAuthMethods.createAllFunctions();
