export default interface SmtpProviders {
  _id: string;
  name: string;
  alias: string;
  smtp_url: {
    url: string;
    port: number;
  };
  imap_url: {
    url: string;
    port: number;
  };
  port: number;
  dkim_key: string | undefined;
}
