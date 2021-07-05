import { viewer_rm, content_mgr_rm, mods_rm, mgr_rm } from './policies';

export default {
  viewer: viewer_rm,
  contentMgr: content_mgr_rm,
  mod: mods_rm,
  owner: mgr_rm,
};

export const map = [viewer_rm, content_mgr_rm, mods_rm, mgr_rm];
