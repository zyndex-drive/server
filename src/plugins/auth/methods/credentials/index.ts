import { Credentials } from '@models';
import { AuthModelMethods } from '@plugins/auth/helpers';
import { credentials as credentialPolicies } from '@plugins/templates/policies';

import type {
  ICredentials,
  ICredentialsDoc,
  ICredentialsLeanDoc,
  ICredentialsModel,
} from '@models/types';

const policyMap = {
  view: [credentialPolicies.view],
  add: [credentialPolicies.add],
  edit: [credentialPolicies.edit],
  remove: [credentialPolicies.remove],
};

const defaultCheckFunction = () => ({ check: true });

const authCheckFunctions = {
  add: defaultCheckFunction,
  edit: defaultCheckFunction,
  remove: defaultCheckFunction,
};

const credentialAuthMethods = new AuthModelMethods<
  ICredentials,
  ICredentialsDoc,
  ICredentialsLeanDoc,
  ICredentialsModel
>(Credentials, false, policyMap, authCheckFunctions);

export default credentialAuthMethods.createAllFunctions();
