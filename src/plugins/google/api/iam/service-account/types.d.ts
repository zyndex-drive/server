export type TIAMApiUrlType = `https://iam.googleapis.com/v1/${string}`;

export interface IServiceAccountResource {
  name: string;
  projectId: string;
  uniqueId: string;
  email: string;
  displayName: string;
  etag: string;
  description: string;
  oauth2ClientId: string;
  disabled: boolean;
}
