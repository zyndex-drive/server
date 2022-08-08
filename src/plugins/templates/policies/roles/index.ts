import { roles_view, roles_add, roles_edit, roles_rm } from './policies';

export default {
  view: roles_view,
  add: roles_add,
  edit: roles_edit,
  remove: roles_rm,
};

export const map = [roles_view, roles_add, roles_edit, roles_rm];
