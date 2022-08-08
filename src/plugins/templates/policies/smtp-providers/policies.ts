/**
 * @file Policy Definition File
 * @description Policies Related to Adding and Modifying SMTP Providers
 * @module - Smtp Providers
 * @author Sudharshan TK
 */

import { IPolicy } from '@models/types';
import { objectID } from '@plugins/misc/uid';

const CODE = 'smtppro';

export const smtp_provider_view: Readonly<IPolicy> = {
  _id: objectID(),
  code: `${CODE}view`,
  name: 'View SMTP Email Providers',
  message: 'Enable Viewing SMTP Email Providers from Database',
  global_flag: true,
};

export const smtp_provider_add: Readonly<IPolicy> = {
  _id: objectID(),
  code: `${CODE}add`,
  name: 'Add SMTP Email Providers',
  message: 'Enable Adding of SMTP Email Providers to Database',
  global_flag: true,
};

export const smtp_provider_edit: Readonly<IPolicy> = {
  _id: objectID(),
  code: `${CODE}edit`,
  name: 'Edit SMTP Email Providers',
  message: 'Enable Editing of SMTP Email Providers in Database',
  global_flag: true,
};

export const smtp_provider_rm: Readonly<IPolicy> = {
  _id: objectID(),
  code: `${CODE}rm`,
  name: 'Remove SMTP Email Providers',
  message: 'Enable Removal of SMTP Email Providers from Database',
  global_flag: true,
};
