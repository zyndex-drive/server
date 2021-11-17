/**
 * @file Global Settings Definition File
 * @description Describes different Global Settings for the Organisation
 * @author Sudharshan TK
 *
 * Note: This Will be used only at the time of First Setup
 */

import { IGlobalSettings } from '@models/global-setting/types';
import { Types } from 'mongoose';

const objectID = (num: string) => Types.ObjectId(`settings@${num}`);

export const userRequests = (flag: boolean): Readonly<IGlobalSettings> => ({
  _id: objectID('001'),
  name: 'Allow User Requests',
  message: 'Enable New User Requests Globally',
  global_flag: flag,
});

export const upgradeRequests = (flag: boolean): Readonly<IGlobalSettings> => ({
  _id: objectID('002'),
  name: 'Allow Role Upgrade Requests',
  message: 'Enable Existing User Role Upgrade Requests Globally',
  global_flag: flag,
});

export const tmdbFlag = (flag: boolean): Readonly<IGlobalSettings> => ({
  _id: objectID('003'),
  name: 'Allow TMDB Metadata',
  message: 'Enable TMDB Api for Fetching Metadata Globally',
  global_flag: flag,
});

export const mailing = (flag: boolean): Readonly<IGlobalSettings> => ({
  _id: objectID('004'),
  name: 'Allow Mailing',
  message: 'Enable Mailing of User Requests, Invites, etc.',
  global_flag: flag,
});

export const otpVerification = (flag: boolean): Readonly<IGlobalSettings> => ({
  _id: objectID('005'),
  name: 'Allow OTP Verify',
  message: 'Require OTP Verification of New Users',
  global_flag: flag,
});

export const maxSessions = (sessions: number): Readonly<IGlobalSettings> => ({
  _id: objectID('006'),
  name: 'Allow OTP Verify',
  message: 'Require OTP Verification of New Users',
  global_flag: sessions,
});

export const defaultSmtpProvider = (
  provider_id: string,
): Readonly<IGlobalSettings> => ({
  _id: objectID('007'),
  name: 'Allow OTP Verify',
  message: 'Require OTP Verification of New Users',
  global_flag: provider_id,
  reference: 'SMTPProvider',
});

export const defaultSmtpMailer = (
  mailer_id: string,
): Readonly<IGlobalSettings> => ({
  _id: objectID('008'),
  name: 'Allow OTP Verify',
  message: 'Require OTP Verification of New Users',
  global_flag: mailer_id,
  reference: 'SMTPMailer',
});
