import {
  viewer_add,
  content_mgr_add,
  mod_add,
  owner_add,
  self_content_mgr_add,
  self_mod_add,
  self_owner_add,
} from './policies';

export default {
  accept: {
    viewer: viewer_add,
    contentMgr: content_mgr_add,
    mods: mod_add,
    owner: owner_add,
  },
  promote: {
    contentMgr: self_content_mgr_add,
    mods: self_mod_add,
    owner: self_owner_add,
  },
};
