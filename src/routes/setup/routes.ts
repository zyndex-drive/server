import credentials from './credentials';
import policies from './policies';
import roles from './roles';
import scopes from './scope';
import frontends from './frontend';
import settings from './settings';
import tokens from './token';
import smtpProviders from './smtp-provider';
import smtpMailers from './smtp-mailer';
import users from './user';

import { SetupGenerator } from '@plugins/server/generators';

// Models
import {
  Credentials,
  Frontends,
  Policies,
  Roles,
  Scopes,
  GlobalSettings,
  SMTPMailers,
  SMTPProviders,
  Tokens,
  Users,
} from '@models';

export default [
  {
    name: '/credentials',
    map: credentials,
    setup: new SetupGenerator(Credentials).serve(),
  },
  {
    name: '/policies',
    map: policies,
    setup: new SetupGenerator(Policies).serve(),
  },
  {
    name: '/roles',
    map: roles,
    setup: new SetupGenerator(Roles).serve(),
  },
  {
    name: '/scopes',
    map: scopes,
    setup: new SetupGenerator(Scopes).serve(),
  },
  {
    name: '/frontends',
    map: frontends,
    setup: new SetupGenerator(Frontends).serve(),
  },
  {
    name: '/settings',
    map: settings,
    setup: new SetupGenerator(GlobalSettings).serve(),
  },
  {
    name: '/tokens',
    map: tokens,
    setup: new SetupGenerator(Tokens).serve(),
  },
  {
    name: '/smtp-providers',
    map: smtpProviders,
    setup: new SetupGenerator(SMTPProviders).serve(),
  },
  {
    name: '/smtp-mailers',
    map: smtpMailers,
    setup: new SetupGenerator(SMTPMailers).serve(),
  },
  {
    name: '/users',
    map: users,
    setup: new SetupGenerator(Users).serve(),
  },
];
