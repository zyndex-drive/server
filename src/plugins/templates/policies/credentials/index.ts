import { creds_view, creds_add, creds_edit, creds_rm } from './policies';

export default {
  view: creds_view,
  add: creds_add,
  edit: creds_edit,
  remove: creds_rm,
};

export const map = [creds_view, creds_add, creds_edit, creds_rm];
