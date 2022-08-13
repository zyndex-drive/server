import { SMTPMailers } from '@models';
import { AuthModelMethods } from '@plugins/auth/helpers';
import { smtpMailers as smtpMailerPolicies } from '@plugins/templates/policies';

import type {
  ISMTPMailer,
  ISMTPMailerDoc,
  ISMTPMailerLeanDoc,
  ISMTPMailerModel,
} from '@models/types';

const policyMap = {
  view: [smtpMailerPolicies.view],
  add: [smtpMailerPolicies.add],
  edit: [smtpMailerPolicies.edit],
  remove: [smtpMailerPolicies.remove],
};

const defaultCheckFunction = () => ({ check: true });

const authCheckFunctions = {
  add: defaultCheckFunction,
  edit: defaultCheckFunction,
  remove: defaultCheckFunction,
};

const smtpMailerAuthMethods = new AuthModelMethods<
  ISMTPMailer,
  ISMTPMailerDoc,
  ISMTPMailerLeanDoc,
  ISMTPMailerModel
>(SMTPMailers, false, policyMap, authCheckFunctions);

export default smtpMailerAuthMethods.createAllFunctions();
