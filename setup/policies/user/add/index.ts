import { viewer_add, content_mgr_add, mod_add, mgr_add } from './policies';
import { self_content_mgr_add, self_mod_add, self_mgr_add } from './policies';

export default {
  accept: {
    viewer: viewer_add,
    contentMgr: content_mgr_add,
    mods: mod_add,
    manager: mgr_add,
  },
  promote: {
    contentMgr: self_content_mgr_add,
    mods: self_mod_add,
    manager: self_mgr_add,
  },
};

export const map = [
  viewer_add,
  content_mgr_add,
  mod_add,
  mgr_add,
  self_content_mgr_add,
  self_mod_add,
  self_mgr_add,
];
