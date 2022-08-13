import { ServiceAccs } from '@models';
import { AuthModelMethods } from '@plugins/auth/helpers';
import { serviceAccounts as serviceAccPolicies } from '@plugins/templates/policies';

import type {
  IServiceAcc,
  IServiceAccDoc,
  IServiceAccLeanDoc,
  IServiceAccModel,
} from '@models/types';

const policyMap = {
  view: [serviceAccPolicies.view],
  add: [serviceAccPolicies.add],
  edit: [serviceAccPolicies.edit],
  remove: [serviceAccPolicies.remove],
};

const defaultCheckFunction = () => ({ check: true });

const authCheckFunctions = {
  add: defaultCheckFunction,
  edit: defaultCheckFunction,
  remove: defaultCheckFunction,
};

const serviceAccountAuthMethods = new AuthModelMethods<
  IServiceAcc,
  IServiceAccDoc,
  IServiceAccLeanDoc,
  IServiceAccModel
>(ServiceAccs, false, policyMap, authCheckFunctions);

export default serviceAccountAuthMethods.createAllFunctions();
