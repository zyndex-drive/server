// Initialization
import express from 'express';

// Response Handlers
import {
  okResponse,
  createdResponse,
  badRequest,
  internalServerError,
} from '@plugins/server/responses';

// Model
import { GlobalSettings } from '@models';

// Global Settings Handlers
import {
  userRequests,
  upgradeRequests,
  otpVerification,
  tmdbFlag,
  defaultSmtpMailer,
  defaultSmtpProvider,
  mailing,
  maxSessions,
} from '@plugins/templates/global-settings';

// Others
import { EndpointGenerator } from '@plugins/server/generators';

// Types
import { Response } from 'express';
import { Error as MongoError } from 'mongoose';
import { IGlobalSettings, IGlobalSettingsLeanDoc } from '@models/types';

const router = express.Router();

const savenSendit = (res: Response, globalSetting: IGlobalSettings) => {
  const newGlobalSetting = new GlobalSettings(globalSetting);
  newGlobalSetting
    .save()
    .then((globalSettingDoc) => {
      createdResponse<IGlobalSettingsLeanDoc>(res, globalSettingDoc.toObject());
    })
    .catch((err: MongoError) => {
      internalServerError(res, err.name, err.message);
    });
};

router.post('/user-requests', (req, res) => {
  const { requests }: { requests: boolean } = req.body;
  let userRequestsFlag: Readonly<IGlobalSettings>;
  if (requests) {
    userRequestsFlag = userRequests(true);
  } else {
    userRequestsFlag = userRequests(false);
  }
  savenSendit(res, userRequestsFlag);
});

router.post('/upgrade-requests', (req, res) => {
  const { requests }: { requests: boolean } = req.body;
  let upgradeRequestFlag: Readonly<IGlobalSettings>;
  if (requests) {
    upgradeRequestFlag = upgradeRequests(true);
  } else {
    upgradeRequestFlag = upgradeRequests(false);
  }
  savenSendit(res, upgradeRequestFlag);
});

router.post('/otp-verification', (req, res) => {
  const { otp }: { otp: boolean } = req.body;
  let otpFlag: Readonly<IGlobalSettings>;
  if (otp) {
    otpFlag = otpVerification(true);
  } else {
    otpFlag = otpVerification(false);
  }
  savenSendit(res, otpFlag);
});

router.post('/tmdb-api', (req, res) => {
  const { tmdb }: { tmdb: boolean } = req.body;
  let tmdbApi: Readonly<IGlobalSettings>;
  if (tmdb) {
    tmdbApi = tmdbFlag(true);
  } else {
    tmdbApi = tmdbFlag(false);
  }
  savenSendit(res, tmdbApi);
});

router.post('/max-sessions', (req, res) => {
  const { sessions }: { sessions: number } = req.body;
  if (sessions && typeof sessions === 'number') {
    const sessionSetting = maxSessions(sessions);
    savenSendit(res, sessionSetting);
  } else {
    badRequest(res, 'sessions', 'request');
  }
});

router.post('/mailing', (req, res) => {
  const { mail }: { mail: boolean } = req.body;
  let mailFlag: Readonly<IGlobalSettings>;
  if (mail) {
    mailFlag = mailing(true);
  } else {
    mailFlag = mailing(false);
  }
  savenSendit(res, mailFlag);
});

router.post('/smtp-mailer', (req, res) => {
  const { mailerId }: { mailerId: string } = req.body;
  if (mailerId && typeof mailerId === 'string') {
    const smtpMailer = defaultSmtpMailer(mailerId);
    savenSendit(res, smtpMailer);
  } else {
    badRequest(res, 'mailerId', 'Request');
  }
});

router.post('/smtp-provider', (req, res) => {
  const { providerId }: { providerId: string } = req.body;
  if (providerId && typeof providerId === 'string') {
    const smtpProvider = defaultSmtpProvider(providerId);
    savenSendit(res, smtpProvider);
  } else {
    badRequest(res, 'providerId', 'Request');
  }
});

router.post('/get', (req, res) => {
  GlobalSettings.find({})
    .lean()
    .exec()
    .then((globalSettingDocs) => {
      okResponse<IGlobalSettingsLeanDoc[]>(res, globalSettingDocs);
    })
    .catch((err: MongoError) => {
      internalServerError(res, err.name, err.message);
    });
});

// Respond with all the Endpoints in this Route
router.post('/endpoints', (req, res) =>
  new EndpointGenerator(res, router).serve(),
);

export default router;
