import { sac_view, sac_add, sac_edit, sac_rm } from './policies';

export default {
  view: sac_view,
  add: sac_add,
  edit: sac_edit,
  remove: sac_rm,
};

export const map = [sac_view, sac_add, sac_edit, sac_rm];
