export type TCloudApiUrlType =
  `https://cloudresourcemanager.googleapis.com/v1/${string}`;

export interface ICloudProjectResource {
  projectNumber: string;
  projectId: string;
  lifecycleState: 'LIFECYCLE_STATE_UNSPECIFIED' | 'ACTIVE' | 'DELETE_REQUESTED';
  name: string;
  createTime: string;
  labels?: Record<string, string>;
  parent?: {
    type: string;
    id: string;
  };
}
