import { createTransport } from 'nodemailer';

import type { Transporter } from 'nodemailer';
import type {
  IServiceAccDoc,
  ICredentialsDoc,
  ITokenDoc,
  ISMTPMailerDoc,
  ISMTPProviderDoc,
} from '@models/types';
import type SMTPPool from 'nodemailer/lib/smtp-pool';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

interface IGMAILOptions {
  type: 'service' | 'normal';
  credentials: ICredentialsDoc;
  tokens: {
    refresh: ITokenDoc;
    access: ITokenDoc;
  };
  service_account?: IServiceAccDoc;
}

/**
 * Creates a Mail Transporter using Node mailer
 *
 * @param {ISMTPProviderDoc} SMTPProvider - SMTP Provider Document from Database
 * @param {ISMTPMailerDoc} SMTPMailer - SMTP Mailer Document from Database
 * @param {IGMAILOptions} gmailOptions - GMAIL Credential Document from Database
 * @returns {Transporter} - Nodemailer Transporter
 */
export default function (
  SMTPProvider: ISMTPProviderDoc,
  SMTPMailer: ISMTPMailerDoc,
  gmailOptions?: IGMAILOptions,
): Transporter {
  const transporterOptions:
    | SMTPPool
    | SMTPPool['options']
    | SMTPTransport
    | SMTPTransport['options'] = {
    host: SMTPProvider.smtp.url,
    port: SMTPProvider.smtp.port,
    pool: true,
    secure: true,
    auth: {
      user: SMTPMailer.email,
      pass: SMTPMailer.password,
    },
  };
  if (SMTPProvider.dkim_key && SMTPProvider.dkim_options) {
    transporterOptions.dkim = {
      privateKey: SMTPProvider.dkim_key,
      domainName: SMTPProvider.dkim_options.domain,
      keySelector: SMTPProvider.dkim_options.key_selector,
    };
  }
  if (SMTPProvider.type === 'gmail' && gmailOptions) {
    if (gmailOptions.type === 'normal') {
      transporterOptions.auth = {
        ...transporterOptions.auth,
        type: 'OAUTH2',
        clientId: gmailOptions.credentials.client_id,
        clientSecret: gmailOptions.credentials.client_secret,
        refreshToken: gmailOptions.tokens.refresh.token,
        accessToken: gmailOptions.tokens.access.token,
        expires: gmailOptions.tokens.access.expires_at,
      };
    } else if (
      gmailOptions.type === 'service' &&
      gmailOptions.service_account
    ) {
      transporterOptions.auth = {
        ...transporterOptions.auth,
        type: 'OAUTH2',
        user: gmailOptions.service_account.client.email,
        serviceClient: gmailOptions.service_account.client.id,
        privateKey: gmailOptions.service_account.private_key.key,
        accessToken: gmailOptions.tokens.access.token,
        expires: gmailOptions.tokens.access.expires_at,
      };
    } else {
      throw new Error(
        'Configuration is Wrong, Please pass Parameters Carefully Again',
      );
    }
  } else if (SMTPProvider.type === 'gmail' && !gmailOptions) {
    throw new Error(
      'GmailOptions is Necessary if SMTP is of Type Gmail, Please pass the Gmailoptions',
    );
  }
  const transporter = createTransport(transporterOptions);
  return transporter;
}
