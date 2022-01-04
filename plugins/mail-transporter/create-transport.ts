import { createTransport } from 'nodemailer';

import type { Transporter } from 'nodemailer';
import type { ISMTPProviderDoc } from '@models/smtp-provider/types';
import type { ISMTPMailerDoc } from '@models/smtp-mailer/types';

/**
 * Creates a Mail Transporter using Node mailer
 *
 * @param {ISMTPProviderDoc} SMTPProvider - SMTP Provider Document from Database
 * @param {ISMTPMailerDoc} SMTPMailer - SMTP Mailer Document from Database
 * @returns {Transporter} - Nodemailer Transporter
 */
export default function (
  SMTPProvider: ISMTPProviderDoc,
  SMTPMailer: ISMTPMailerDoc,
): Transporter {
  const transporter: Transporter = createTransport({
    host: SMTPProvider.smtp.url,
    port: SMTPProvider.smtp.port,
    pool: true,
    secure: true,
    auth: {
      user: SMTPMailer.email,
      pass: SMTPMailer.password,
    },
  });
  return transporter;
}
