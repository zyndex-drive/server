import { IDrivePermissionResource } from '@google/api/drive/permissions/types';

export type TOrderbyValues =
  | 'createdTime'
  | 'folder'
  | 'modifiedTime'
  | 'name'
  | 'quotaBytesUsed';

export interface IDriveFileSearchDetails {
  corpora: 'user' | 'drive' | 'domain' | 'allDrives';
  driveId?: string;
  includeItemsFromAllDrives?: boolean;
  orderBy?: `${TOrderbyValues}${' desc' | ''}`;
  supportsAllDrives?: boolean;
  pageToken?: string;
}

export interface IDriveFileDetails {
  id: string;
  name: string;
  description: string;
  parents: string[];
}

export interface IDriveFileResource extends IDriveFileDetails {
  name: string;
  mimeType: string;
  version: number | BigInteger;
  webContentLink: string;
  webViewLink: string;
  iconLink: string;
  hasThumbnail: boolean;
  thumbnailLink: string;
  createdTime: string;
  modifiedTime: string;
  modifiedByMeTime: string;
  modifiedByMe: boolean;
  sharedWithMeTime: string;
  sharingUser: {
    kind: 'drive#user';
    displayName: string;
    photoLink: string;
    me: boolean;
    permissionId: IDrivePermissionResource['id'][];
    emailAddress: string;
  };
  owners: [
    {
      kind: 'drive#user';
      displayName: string;
      photoLink: string;
      me: boolean;
      permissionId: IDrivePermissionResource['id'][];
      emailAddress: string;
    },
  ];
  driveId?: string;
  lastModifyingUser: {
    kind: 'drive#user';
    displayName: string;
    photoLink: string;
    me: boolean;
    permissionId: IDrivePermissionResource['id'][];
    emailAddress: string;
  };
  capabilities: {
    canAddChildren: boolean;
    canAddFolderFromAnotherDrive: boolean;
    canAddMyDriveParent: boolean;
    canChangeCopyRequiresWriterPermission: boolean;
    canChangeSecurityUpdateEnabled: boolean;
    canChangeViewersCanCopyContent: boolean;
    canComment: boolean;
    canCopy: boolean;
    canDelete: boolean;
    canDeleteChildren: boolean;
    canDownload: boolean;
    canEdit: boolean;
    canListChildren: boolean;
    canModifyContent: boolean;
    canModifyContentRestriction: boolean;
    canMoveChildrenOutOfTeamDrive: boolean;
    canMoveChildrenOutOfDrive: boolean;
    canMoveChildrenWithinTeamDrive: boolean;
    canMoveChildrenWithinDrive: boolean;
    canMoveItemIntoTeamDrive: boolean;
    canMoveItemOutOfTeamDrive: boolean;
    canMoveItemOutOfDrive: boolean;
    canMoveItemWithinTeamDrive: boolean;
    canMoveItemWithinDrive: boolean;
    canMoveTeamDriveItem: boolean;
    canReadRevisions: boolean;
    canReadTeamDrive: boolean;
    canReadDrive: boolean;
    canRemoveChildren: boolean;
    canRemoveMyDriveParent: boolean;
    canRename: boolean;
    canShare: boolean;
    canTrash: boolean;
    canTrashChildren: boolean;
    canUntrash: boolean;
  };
  copyRequiresWriterPermission: boolean;
  permissions: IDrivePermissionResource[];
  permissionIds: IDrivePermissionResource['id'][];
  originalFilename: string;
  fullFileExtension: string;
  fileExtension: string;
  md5Checksum: string;
  size: number | BigInteger;
  quotaBytesUsed: number | BigInteger;
  headRevisionId: string;
  imageMediaMetadata: {
    width: number;
    height: number;
    rotation: number;
    location: {
      latitude: number;
      longitude: number;
      altitude: number;
    };
    time: string;
    cameraMake: string;
    cameraModel: string;
    exposureTime: number;
    aperture: number;
    flashUsed: boolean;
    focalLength: number;
    isoSpeed: number;
    meteringMode: string;
    sensor: string;
    exposureMode: string;
    colorSpace: string;
    whiteBalance: string;
    exposureBias: number;
    maxApertureValue: number;
    subjectDistance: number;
    lens: string;
  };
  videoMediaMetadata: {
    width: number;
    height: number;
    durationMillis: number | BigInteger;
  };
  contentRestrictions: [
    {
      readOnly: boolean;
      reason: string;
      restrictingUser: {
        kind: 'drive#user';
        displayName: string;
        photoLink: string;
        me: boolean;
        permissionId: IDrivePermissionResource['id'][];
        emailAddress: string;
      };
      restrictionTime: string;
      type: string;
    },
  ];
}
