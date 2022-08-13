import { SMTPProviders } from '@models';
import { AuthModelMethods } from '@plugins/auth/helpers';
import { smtpProviders as smtpProvidersPolicies } from '@plugins/templates/policies';

import type {
  ISMTPProvider,
  ISMTPProviderDoc,
  ISMTPProviderLeanDoc,
  ISMTPProviderModel,
} from '@models/types';

const policyMap = {
  view: [smtpProvidersPolicies.view],
  add: [smtpProvidersPolicies.add],
  edit: [smtpProvidersPolicies.edit],
  remove: [smtpProvidersPolicies.remove],
};

const defaultCheckFunction = () => ({ check: true });

const authCheckFunctions = {
  add: defaultCheckFunction,
  edit: defaultCheckFunction,
  remove: defaultCheckFunction,
};

const smtpProviderAuthMethods = new AuthModelMethods<
  ISMTPProvider,
  ISMTPProviderDoc,
  ISMTPProviderLeanDoc,
  ISMTPProviderModel
>(SMTPProviders, false, policyMap, authCheckFunctions);

export default smtpProviderAuthMethods.createAllFunctions();
