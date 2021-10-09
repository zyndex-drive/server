export interface IDrivePermissionDetails {
  type: string;
  emailAddress: string;
  role: string;
  permissionDetails?: [
    {
      permissionType: string;
      role: string;
      inheritedFrom: string;
      inherited: boolean;
    },
  ];
}

export interface IDrivePermissionResource extends IDrivePermissionDetails {
  id: string;
  domain: string;
  photoLink: string;
}
