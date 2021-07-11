import {
  viewer_blist,
  content_mgr_blist,
  mod_blist,
  mgr_blist,
} from './policies';

export default {
  viewer: viewer_blist,
  contentMgr: content_mgr_blist,
  mods: mod_blist,
  manager: mgr_blist,
};

export const map = [viewer_blist, content_mgr_blist, mod_blist, mgr_blist];
