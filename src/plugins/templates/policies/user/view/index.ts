import { viewer_view, content_mgr_view, mod_view, mgr_view } from './policies';

export default {
  viewer: viewer_view,
  contentMgr: content_mgr_view,
  mods: mod_view,
  manager: mgr_view,
};

export const map = [viewer_view, content_mgr_view, mod_view, mgr_view];
