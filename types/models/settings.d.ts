export default interface Settings {
  _id: string;
  name: string;
  url: string;
  user_requests: boolean;
  upgrade_requests: boolean;
  tmdb_flag: boolean;
  mailing: boolean;
  otp_verification: boolean;
  default_smtp_provider: string;
  default_smtp_mailer: string;
}
