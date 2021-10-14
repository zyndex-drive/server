import type { TGoogleMimeType } from './types';

const mimeTypes: Record<string, TGoogleMimeType> = {
  audio: 'application/vnd.google-apps.audio',
  docs: 'application/vnd.google-apps.document',
  drawings: 'application/vnd.google-apps.drawing',
  drivesdk: 'application/vnd.google-apps.drive-sdk',
  file: 'application/vnd.google-apps.file',
  folder: 'application/vnd.google-apps.folder',
  form: 'application/vnd.google-apps.form',
  fusiontable: 'application/vnd.google-apps.fusiontable',
  map: 'application/vnd.google-apps.map',
  photo: 'application/vnd.google-apps.photo',
  presentation: 'application/vnd.google-apps.presentation',
  script: 'application/vnd.google-apps.script',
  shortcut: 'application/vnd.google-apps.shortcut',
  site: 'application/vnd.google-apps.site',
  spreadsheet: 'application/vnd.google-apps.spreadsheet',
  unknown: 'application/vnd.google-apps.unknown',
  video: 'application/vnd.google-apps.video',
};

export default mimeTypes;

export const mimeArray: TGoogleMimeType[] = [
  'application/vnd.google-apps.audio',
  'application/vnd.google-apps.document',
  'application/vnd.google-apps.drive-sdk',
  'application/vnd.google-apps.drawing',
  'application/vnd.google-apps.file',
  'application/vnd.google-apps.folder',
  'application/vnd.google-apps.form',
  'application/vnd.google-apps.fusiontable',
  'application/vnd.google-apps.map',
  'application/vnd.google-apps.photo',
  'application/vnd.google-apps.presentation',
  'application/vnd.google-apps.script',
  'application/vnd.google-apps.shortcut',
  'application/vnd.google-apps.site',
  'application/vnd.google-apps.spreadsheet',
  'application/vnd.google-apps.unknown',
  'application/vnd.google-apps.video',
];
