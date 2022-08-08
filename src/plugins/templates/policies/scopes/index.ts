import { scope_view, scope_add, scope_edit, scope_rm } from './policies';

export default {
  view: scope_view,
  add: scope_add,
  edit: scope_edit,
  remove: scope_rm,
};

export const map = [scope_view, scope_add, scope_edit, scope_rm];
