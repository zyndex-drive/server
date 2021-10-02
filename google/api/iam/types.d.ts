export type TIAMApiUrlType = `https://iam.googleapis.com/v1/${string}`;
export type TCloudApiUrlType =
  `https://cloudresourcemanager.googleapis.com/v1/${string}`;

export interface IServiceAccountDetails {
  name: string;
  displayName: string;
  description: string;
}
