import { frontend_add, frontend_edit, frontend_rm } from './policies';

export default {
  add: frontend_add,
  edit: frontend_edit,
  remove: frontend_rm,
};

export const map = [frontend_add, frontend_edit, frontend_rm];
