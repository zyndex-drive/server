import { sac_add, sac_edit, sac_rm } from './policies';

export default {
  add: sac_add,
  edit: sac_edit,
  remove: sac_rm,
};

export const map = [sac_add, sac_edit, sac_rm];
