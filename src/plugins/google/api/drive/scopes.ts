import type { TGoogleApiScope } from '@plugins/google/helpers/types';

const scopes: TGoogleApiScope[] = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.metadata',
  'https://www.googleapis.com/auth/drive.appdata',
  'https://www.googleapis.com/auth/drive.activity.readonly',
];

export default scopes;
