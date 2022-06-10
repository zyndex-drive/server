// Initialization
import express from 'express';

// Response Handlers
import {
  createdResponse,
  errorResponseHandler,
} from '@plugins/server/responses';

// HTTP Error Classes
import { BadRequest } from '@plugins/errors';

// Model
import { GlobalSettings } from '@models';

// Global Settings Handlers
import {
  serverName,
  serverUserName,
  userRequests,
  upgradeRequests,
  setupStatus,
  otpVerification,
  tmdbFlag,
  defaultSmtpMailer,
  defaultSmtpProvider,
  mailing,
  maxSessions,
  loginTokenExpiry,
  otherTokenExpiry,
} from '@plugins/templates/global-settings';

// Types
import { Response } from 'express';
import { IGlobalSettings } from '@models/types';

const router = express.Router();

const savenSendit = async (res: Response, globalSetting: IGlobalSettings) => {
  try {
    const newGlobalSetting = new GlobalSettings(globalSetting);
    const globalSettingDoc = await newGlobalSetting.save();
    createdResponse(res, globalSettingDoc.toObject());
  } catch (e) {
    errorResponseHandler(res, e);
  }
};

const callorThrow = (res: Response, callback: () => void) => {
  try {
    callback();
  } catch (e) {
    errorResponseHandler(res, e);
  }
};

router.post('/server-name', (req, res) =>
  callorThrow(res, () => {
    const { name }: { name: string } = req.body;
    if (name && typeof name === 'string') {
      const sessionSetting = serverName(name);
      void savenSendit(res, sessionSetting);
    } else {
      throw new BadRequest('name', 'request');
    }
  }),
);

router.post('/server-user-name', (req, res) =>
  callorThrow(res, () => {
    const { name }: { name: string } = req.body;
    if (name && typeof name === 'string') {
      const sessionSetting = serverUserName(name);
      void savenSendit(res, sessionSetting);
    } else {
      throw new BadRequest('name', 'request');
    }
  }),
);

router.post('/user-requests', (req, res) =>
  callorThrow(res, () => {
    const { requests }: { requests: boolean } = req.body;
    let userRequestsFlag: Readonly<IGlobalSettings>;
    if (requests) {
      userRequestsFlag = userRequests(true);
    } else {
      userRequestsFlag = userRequests(false);
    }
    void savenSendit(res, userRequestsFlag);
  }),
);

router.post('/upgrade-requests', (req, res) =>
  callorThrow(res, () => {
    const { requests }: { requests: boolean } = req.body;
    let upgradeRequestFlag: Readonly<IGlobalSettings>;
    if (requests) {
      upgradeRequestFlag = upgradeRequests(true);
    } else {
      upgradeRequestFlag = upgradeRequests(false);
    }
    void savenSendit(res, upgradeRequestFlag);
  }),
);

router.post('/otp-verification', (req, res) =>
  callorThrow(res, () => {
    const { otp }: { otp: boolean } = req.body;
    let otpFlag: Readonly<IGlobalSettings>;
    if (otp) {
      otpFlag = otpVerification(true);
    } else {
      otpFlag = otpVerification(false);
    }
    void savenSendit(res, otpFlag);
  }),
);

router.post('/setup-check', (req, res) =>
  callorThrow(res, () => {
    const { setup }: { setup: boolean } = req.body;
    let setupFlag: Readonly<IGlobalSettings>;
    if (setup) {
      setupFlag = setupStatus(true);
    } else {
      setupFlag = setupStatus(false);
    }
    void savenSendit(res, setupFlag);
  }),
);

router.post('/tmdb-api', (req, res) =>
  callorThrow(res, () => {
    const { tmdb }: { tmdb: boolean } = req.body;
    let tmdbApi: Readonly<IGlobalSettings>;
    if (tmdb) {
      tmdbApi = tmdbFlag(true);
    } else {
      tmdbApi = tmdbFlag(false);
    }
    void savenSendit(res, tmdbApi);
  }),
);

router.post('/max-sessions', (req, res) =>
  callorThrow(res, () => {
    const { sessions }: { sessions: number } = req.body;
    if (sessions && typeof sessions === 'number') {
      const sessionSetting = maxSessions(sessions);
      void savenSendit(res, sessionSetting);
    } else {
      throw new BadRequest('sessions', 'request');
    }
  }),
);

router.post('/login-session-expiry', (req, res) =>
  callorThrow(res, () => {
    const { expiry }: { expiry: number } = req.body;
    if (expiry && typeof expiry === 'number') {
      const sessionSetting = loginTokenExpiry(expiry);
      void savenSendit(res, sessionSetting);
    } else {
      throw new BadRequest('expiry', 'request');
    }
  }),
);

router.post('/other-token-expiry', (req, res) =>
  callorThrow(res, () => {
    const { expiry }: { expiry: number } = req.body;
    if (expiry && typeof expiry === 'number') {
      const sessionSetting = otherTokenExpiry(expiry);
      void savenSendit(res, sessionSetting);
    } else {
      throw new BadRequest('expiry', 'request');
    }
  }),
);

router.post('/mailing', (req, res) =>
  callorThrow(res, () => {
    const { mail }: { mail: boolean } = req.body;
    let mailFlag: Readonly<IGlobalSettings>;
    if (mail) {
      mailFlag = mailing(true);
    } else {
      mailFlag = mailing(false);
    }
    void savenSendit(res, mailFlag);
  }),
);

router.post('/smtp-mailer', (req, res) =>
  callorThrow(res, () => {
    const { mailerId }: { mailerId: string } = req.body;
    if (mailerId && typeof mailerId === 'string') {
      const smtpMailer = defaultSmtpMailer(mailerId);
      void savenSendit(res, smtpMailer);
    } else {
      throw new BadRequest('mailerId', 'Request');
    }
  }),
);

router.post('/smtp-provider', (req, res) =>
  callorThrow(res, () => {
    const { providerId }: { providerId: string } = req.body;
    if (providerId && typeof providerId === 'string') {
      const smtpProvider = defaultSmtpProvider(providerId);
      void savenSendit(res, smtpProvider);
    } else {
      throw new BadRequest('providerId', 'Request');
    }
  }),
);

export default router;
