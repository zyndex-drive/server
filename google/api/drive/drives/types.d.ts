export interface IDriveResourceDetails {
  name: string;
  capabilities: {
    canAddChildren: boolean;
    canChangeCopyRequiresWriterPermissionRestriction: boolean;
    canChangeDomainUsersOnlyRestriction: boolean;
    canChangeDriveBackground: boolean;
    canChangeDriveMembersOnlyRestriction: boolean;
    canComment: boolean;
    canCopy: boolean;
    canDeleteChildren: boolean;
    canDeleteDrive: boolean;
    canDownload: boolean;
    canEdit: boolean;
    canListChildren: boolean;
    canManageMembers: boolean;
    canReadRevisions: boolean;
    canRename: boolean;
    canRenameDrive: boolean;
    canShare: boolean;
    canTrashChildren: boolean;
  };
  restrictions: {
    adminManagedRestrictions: boolean;
    copyRequiresWriterPermission: boolean;
    domainUsersOnly: boolean;
    driveMembersOnly: boolean;
  };
}

export interface IDriveResourceType extends IDriveResourceDetails {
  id: string;
  createdTime: string;
  hidden: boolean;
}
