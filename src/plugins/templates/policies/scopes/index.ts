import { scope_add, scope_edit, scope_rm } from './policies';

export default {
  add: scope_add,
  edit: scope_edit,
  remove: scope_rm,
};

export const map = [scope_add, scope_edit, scope_rm];
