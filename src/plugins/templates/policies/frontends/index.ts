import {
  frontend_view,
  frontend_add,
  frontend_edit,
  frontend_rm,
} from './policies';

export default {
  view: frontend_view,
  add: frontend_add,
  edit: frontend_edit,
  remove: frontend_rm,
};

export const map = [frontend_view, frontend_add, frontend_edit, frontend_rm];
