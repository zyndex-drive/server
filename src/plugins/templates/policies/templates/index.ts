import { templates_add, templates_edit, templates_rm } from './policies';

export default {
  add: templates_add,
  edit: templates_edit,
  remove: templates_rm,
};

export const map = [templates_add, templates_edit, templates_rm];
