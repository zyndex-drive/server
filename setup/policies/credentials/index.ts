import { creds_add, creds_edit, creds_rm } from './policies';

export default {
  add: creds_add,
  edit: creds_edit,
  remove: creds_rm,
};

export const map = [creds_add, creds_edit, creds_rm];
