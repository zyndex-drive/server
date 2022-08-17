import * as models from '@models';
import { AuthModelMethods } from '@plugins/auth/helpers';
import * as policy from '@plugins/templates/policies';
import { NotAllowed } from '@plugins/errors';

import type * as MTypes from '@models/types';
import type { UpdateQuery } from 'mongoose';

const credentialAuthMethods = new AuthModelMethods<
  MTypes.ICredentials,
  MTypes.ICredentialsDoc,
  MTypes.ICredentialsLeanDoc,
  MTypes.ICredentialsModel
>(models.Credentials, false, false, policy.credentials);

const frontendsAuthMethods = new AuthModelMethods<
  MTypes.IFrontend,
  MTypes.IFrontendDoc,
  MTypes.IFrontendLeanDoc,
  MTypes.IFrontendModel
>(models.Frontends, true, false, policy.frontends);

const globalSettingsAuthMethods = new AuthModelMethods<
  MTypes.IGlobalSettings,
  MTypes.IGlobalSettingsDoc,
  MTypes.IGlobalSettingsLeanDoc,
  MTypes.IGlobalSettingsModel
>(models.GlobalSettings, true, true, policy.globalSettings, {
  edit: (
    data: MTypes.IGlobalSettingsDoc | MTypes.IGlobalSettingsLeanDoc,
    modifiedData: UpdateQuery<MTypes.IGlobalSettingsDoc>,
  ) => {
    if (modifiedData.code) {
      if (data.code !== modifiedData.code) {
        return {
          check: false,
          error: new NotAllowed(
            'Not Allowed to Edit Code in Global Settings Document',
          ),
        };
      } else {
        return { check: true };
      }
    } else {
      return { check: true };
    }
  },
});

const policyAuthMethods = new AuthModelMethods<
  MTypes.IPolicy,
  MTypes.IPolicyDoc,
  MTypes.IPolicyLeanDoc,
  MTypes.IPolicyModel
>(models.Policies, true, true, policy.policy, {
  edit: (
    data: MTypes.IPolicyDoc | MTypes.IPolicyLeanDoc,
    modifiedData: UpdateQuery<MTypes.IPolicyDoc>,
  ) => {
    if (modifiedData.code) {
      if (data.code !== modifiedData.code) {
        return {
          check: false,
          error: new NotAllowed(
            'Not Allowed to Edit Code in Global Settings Document',
          ),
        };
      } else {
        return { check: true };
      }
    } else {
      return { check: true };
    }
  },
});

const roleAuthMethods = new AuthModelMethods<
  MTypes.IRole,
  MTypes.IRoleDoc,
  MTypes.IRoleLeanDoc,
  MTypes.IRoleModel
>(models.Roles, true, false, policy.roles, {
  add: (data: MTypes.IRole) => {
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
    data: MTypes.IRoleDoc | MTypes.IRoleLeanDoc,
    modifiedData: UpdateQuery<MTypes.IRoleDoc>,
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
  remove: (data: MTypes.IRoleDoc | MTypes.IRoleLeanDoc) => {
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
});

const scopeAuthMethods = new AuthModelMethods<
  MTypes.IScope,
  MTypes.IScopeDoc,
  MTypes.IScopeLeanDoc,
  MTypes.IScopeModel
>(models.Scopes, true, false, policy.scopes);

const serviceAccountAuthMethods = new AuthModelMethods<
  MTypes.IServiceAcc,
  MTypes.IServiceAccDoc,
  MTypes.IServiceAccLeanDoc,
  MTypes.IServiceAccModel
>(models.ServiceAccs, false, false, policy.serviceAccounts);

const smtpMailerAuthMethods = new AuthModelMethods<
  MTypes.ISMTPMailer,
  MTypes.ISMTPMailerDoc,
  MTypes.ISMTPMailerLeanDoc,
  MTypes.ISMTPMailerModel
>(models.SMTPMailers, false, false, policy.smtpMailers);

const smtpProviderAuthMethods = new AuthModelMethods<
  MTypes.ISMTPProvider,
  MTypes.ISMTPProviderDoc,
  MTypes.ISMTPProviderLeanDoc,
  MTypes.ISMTPProviderModel
>(models.SMTPProviders, false, false, policy.smtpProviders);

const templateAuthMethods = new AuthModelMethods<
  MTypes.ITemplate,
  MTypes.ITemplateDoc,
  MTypes.ITemplateLeanDoc,
  MTypes.ITemplateModel
>(models.Templates, false, false, policy.templates);

export const credentials = credentialAuthMethods.createAllFunctions();
export const frontends = frontendsAuthMethods.createAllFunctions();
export const globalSettings = globalSettingsAuthMethods.createAllFunctions();
export const policies = policyAuthMethods.createAllFunctions();
export const roles = roleAuthMethods.createAllFunctions();
export const scopes = scopeAuthMethods.createAllFunctions();
export const serviceAccs = serviceAccountAuthMethods.createAllFunctions();
export const smtpMailer = smtpMailerAuthMethods.createAllFunctions();
export const smtpProvider = smtpProviderAuthMethods.createAllFunctions();
export const templates = templateAuthMethods.createAllFunctions();
