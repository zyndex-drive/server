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

export interface IDrivePermissionResource extends IDrivePermissionResource {
  id: string;
  domain: string;
  photoLink: string;
}
