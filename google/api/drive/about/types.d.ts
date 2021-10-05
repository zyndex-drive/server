export interface IDriveAboutResource {
  user: {
    kind: 'drive#user';
    displayName: string;
    photoLink: string;
    me: boolean;
    permissionId: string;
    emailAddress: string;
  };
  storageQuota: {
    limit: number | BigInteger;
    usage: number | BigInteger;
    usageInDrive: number | BigInteger;
    usageInDriveTrash: number | BigInteger;
  };
  maxUploadSize: number | BigInteger;
  canCreateTeamDrives: boolean;
  canCreateDrives: boolean;
}
