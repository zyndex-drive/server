/**
 * @file Global Settings Definition File
 * @description Describes different Global Settings for the Organisation
 * @author Sudharshan TK
 *
 * Note: This Will be used only at the time of First Setup
 */

import { IGlobalSettings } from '@models/types';
import { objectID } from '@plugins/misc/uid';

export const userRequests = (flag: boolean): Readonly<IGlobalSettings> => ({
  _id: objectID('g'),
  name: 'Allow User Requests',
  message: 'Enable New User Requests Globally',
  global_flag: flag,
});

export const upgradeRequests = (flag: boolean): Readonly<IGlobalSettings> => ({
  _id: objectID('g'),
  name: 'Allow Role Upgrade Requests',
  message: 'Enable Existing User Role Upgrade Requests Globally',
  global_flag: flag,
});

export const tmdbFlag = (flag: boolean): Readonly<IGlobalSettings> => ({
  _id: objectID('g'),
  name: 'Allow TMDB Metadata',
  message: 'Enable TMDB Api for Fetching Metadata Globally',
  global_flag: flag,
});

export const mailing = (flag: boolean): Readonly<IGlobalSettings> => ({
  _id: objectID('g'),
  name: 'Allow Mailing',
  message: 'Enable Mailing of User Requests, Invites, etc.',
  global_flag: flag,
});

export const otpVerification = (flag: boolean): Readonly<IGlobalSettings> => ({
  _id: objectID('g'),
  name: 'Allow OTP Verify',
  message: 'Require OTP Verification of New Users',
  global_flag: flag,
});

export const maxSessions = (sessions: number): Readonly<IGlobalSettings> => ({
  _id: objectID('g'),
  name: 'Allow OTP Verify',
  message: 'Require OTP Verification of New Users',
  global_flag: sessions,
});

export const defaultSmtpProvider = (
  provider_id: string,
): Readonly<IGlobalSettings> => ({
  _id: objectID('g'),
  name: 'Allow OTP Verify',
  message: 'Require OTP Verification of New Users',
  global_flag: provider_id,
  reference: 'SMTPProvider',
});

export const defaultSmtpMailer = (
  mailer_id: string,
): Readonly<IGlobalSettings> => ({
  _id: objectID('g'),
  name: 'Allow OTP Verify',
  message: 'Require OTP Verification of New Users',
  global_flag: mailer_id,
  reference: 'SMTPMailer',
});
