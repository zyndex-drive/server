import { roles_add, roles_edit, roles_rm } from './policies';

export default {
  add: roles_add,
  edit: roles_edit,
  remove: roles_rm,
};

export const map = [roles_add, roles_edit, roles_rm];
