import { Frontends } from '@models';
import { AuthModelMethods } from '@plugins/auth/helpers';
import { frontends as frontendsPolicies } from '@plugins/templates/policies';

import type {
  IFrontend,
  IFrontendDoc,
  IFrontendLeanDoc,
  IFrontendModel,
} from '@models/types';

const policyMap = {
  view: [frontendsPolicies.view],
  add: [frontendsPolicies.add],
  edit: [frontendsPolicies.edit],
  remove: [frontendsPolicies.remove],
};

const defaultCheckFunction = () => ({ check: true });

const authCheckFunctions = {
  add: defaultCheckFunction,
  edit: defaultCheckFunction,
  remove: defaultCheckFunction,
};

const frontendsAuthMethods = new AuthModelMethods<
  IFrontend,
  IFrontendDoc,
  IFrontendLeanDoc,
  IFrontendModel
>(Frontends, true, policyMap, authCheckFunctions);

export default frontendsAuthMethods.createAllFunctions();
