/**
 * Note: This Will be used only at the time of First Setup
 */

import { map as userMap } from './user';
import { map as credsMap } from './credentials';
import { map as frontendMap } from './frontends';
import { map as globalSettingsMap } from './global-settings';
import { map as policyMap } from './policy';
import { map as roleMap } from './roles';
import { map as scopeMap } from './scopes';
import { map as sacMap } from './service-accounts';
import { map as smtpMailerMap } from './smtp-mailer';
import { map as smtpProviderMap } from './smtp-providers';

export { default as users } from './user';
export { default as credentials } from './credentials';
export { default as frontends } from './frontends';
export { default as globalSettings } from './global-settings';
export { default as policy } from './policy';
export { default as roles } from './roles';
export { default as scopes } from './scopes';
export { default as serviceAccounts } from './service-accounts';
export { default as smtpMailers } from './smtp-mailer';
export { default as smtpProviders } from './smtp-providers';

export const map = [
  ...userMap,
  ...credsMap,
  ...frontendMap,
  ...globalSettingsMap,
  ...policyMap,
  ...roleMap,
  ...scopeMap,
  ...sacMap,
  ...smtpMailerMap,
  ...smtpProviderMap,
];
