// Models
import * as models from '@models';

// Auth Helpers
import * as authFunctions from '@plugins/auth/methods';

// Response Handlers
import { ExpressDatabaseHandler } from '@plugins/server/generators';

// Types
import type * as MTypes from '@models/types';

export default [
  {
    name: 'credentials',
    handler: new ExpressDatabaseHandler<
      MTypes.ICredentials,
      MTypes.ICredentialsDoc,
      MTypes.ICredentialsLeanDoc
    >(
      models.Credentials,
      authFunctions.credentials,
      { modelName: 'Credentials' },
      false,
    ),
  },
  {
    name: 'frontends',
    handler: new ExpressDatabaseHandler<
      MTypes.IFrontend,
      MTypes.IFrontendDoc,
      MTypes.IFrontendLeanDoc
    >(
      models.Frontends,
      authFunctions.frontends,
      { modelName: 'Frontends' },
      true,
    ),
  },
  {
    name: 'settings',
    handler: new ExpressDatabaseHandler<
      MTypes.IGlobalSettings,
      MTypes.IGlobalSettingsDoc,
      MTypes.IGlobalSettingsLeanDoc
    >(
      models.GlobalSettings,
      authFunctions.globalSettings,
      { modelName: 'GlobalSettings' },
      true,
    ),
  },
  {
    name: 'policies',
    handler: new ExpressDatabaseHandler<
      MTypes.IPolicy,
      MTypes.IPolicyDoc,
      MTypes.IPolicyLeanDoc
    >(models.Policies, authFunctions.policies, { modelName: 'Policies' }, true),
  },
  {
    name: 'roles',
    handler: new ExpressDatabaseHandler<
      MTypes.IRole,
      MTypes.IRoleDoc,
      MTypes.IRoleLeanDoc
    >(models.Roles, authFunctions.roles, { modelName: 'Roles' }, true),
  },
  {
    name: 'scopes',
    handler: new ExpressDatabaseHandler<
      MTypes.IScope,
      MTypes.IScopeDoc,
      MTypes.IScopeLeanDoc
    >(models.Scopes, authFunctions.scopes, { modelName: 'Scopes' }, true),
  },
  {
    name: 'service-accounts',
    handler: new ExpressDatabaseHandler<
      MTypes.IServiceAcc,
      MTypes.IServiceAccDoc,
      MTypes.IServiceAccLeanDoc
    >(
      models.ServiceAccs,
      authFunctions.serviceAccs,
      { modelName: 'ServiceAccounts' },
      false,
    ),
  },
  {
    name: 'smtp-mailers',
    handler: new ExpressDatabaseHandler<
      MTypes.ISMTPMailer,
      MTypes.ISMTPMailerDoc,
      MTypes.ISMTPMailerLeanDoc
    >(
      models.SMTPMailers,
      authFunctions.smtpMailer,
      { modelName: 'SMTPMailers' },
      false,
    ),
  },
  {
    name: 'smtp-providers',
    handler: new ExpressDatabaseHandler<
      MTypes.ISMTPProvider,
      MTypes.ISMTPProviderDoc,
      MTypes.ISMTPProviderLeanDoc
    >(
      models.SMTPProviders,
      authFunctions.smtpProvider,
      { modelName: 'SMTPProviders' },
      false,
    ),
  },
  {
    name: 'templates',
    handler: new ExpressDatabaseHandler<
      MTypes.ITemplate,
      MTypes.ITemplateDoc,
      MTypes.ITemplateLeanDoc
    >(
      models.Templates,
      authFunctions.templates,
      { modelName: 'Templates' },
      false,
    ),
  },
];
