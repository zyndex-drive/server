/**
 * @file Global Settings Definition File
 * @description Describes different Global Settings for the Organisation
 * @author Sudharshan TK
 *
 * Note: This Will be used only at the time of First Setup
 */

import { IGlobalSettings } from '@models/global-setting/types';

const IDPREFIX = 'globals@';

export const user_requests = (flag: boolean): Readonly<IGlobalSettings> => ({
  _id: `${IDPREFIX}001`,
  name: 'Allow User Requests',
  message: 'Enable New User Requests Globally',
  global_flag: flag,
});

export const upgrade_requests = (flag: boolean): Readonly<IGlobalSettings> => ({
  _id: `${IDPREFIX}002`,
  name: 'Allow Role Upgrade Requests',
  message: 'Enable Existing User Role Upgrade Requests Globally',
  global_flag: flag,
});

export const tmdb_flag = (flag: boolean): Readonly<IGlobalSettings> => ({
  _id: `${IDPREFIX}003`,
  name: 'Allow TMDB Metadata',
  message: 'Enable TMDB Api for Fetching Metadata Globally',
  global_flag: flag,
});

export const mailing = (flag: boolean): Readonly<IGlobalSettings> => ({
  _id: `${IDPREFIX}004`,
  name: 'Allow Mailing',
  message: 'Enable Mailing of User Requests, Invites, etc.',
  global_flag: flag,
});

export const otp_verification = (flag: boolean): Readonly<IGlobalSettings> => ({
  _id: `${IDPREFIX}005`,
  name: 'Allow OTP Verify',
  message: 'Require OTP Verification of New Users',
  global_flag: flag,
});

export const max_sessions = (sessions: number): Readonly<IGlobalSettings> => ({
  _id: `${IDPREFIX}006`,
  name: 'Allow OTP Verify',
  message: 'Require OTP Verification of New Users',
  global_flag: sessions,
});

export const default_smtp_provider = (
  provider_id: string,
): Readonly<IGlobalSettings> => ({
  _id: `${IDPREFIX}007`,
  name: 'Allow OTP Verify',
  message: 'Require OTP Verification of New Users',
  global_flag: provider_id,
  reference: 'SMTPProvider',
});

export const default_smtp_mailer = (
  mailer_id: string,
): Readonly<IGlobalSettings> => ({
  _id: `${IDPREFIX}008`,
  name: 'Allow OTP Verify',
  message: 'Require OTP Verification of New Users',
  global_flag: mailer_id,
  reference: 'SMTPMailer',
});
