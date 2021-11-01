import { viewer_policies, viewer_scope, viewer_restrict } from './policies';
import {
  content_mgr_policies,
  content_mgr_scope,
  content_mgr_restrict,
} from './policies';
import { mods_policies, mods_scope, mods_restrict } from './policies';
import { mgr_policies, mgr_scope, mgr_restrict } from './policies';

export default {
  viewer: {
    policy: viewer_policies,
    scope: viewer_scope,
    restrict: viewer_restrict,
  },
  contentMgr: {
    policy: content_mgr_policies,
    scope: content_mgr_scope,
    restrict: content_mgr_restrict,
  },
  mods: {
    policy: mods_policies,
    scope: mods_scope,
    restrict: mods_restrict,
  },
  manager: {
    policy: mgr_policies,
    scope: mgr_scope,
    restrict: mgr_restrict,
  },
};

const viewers = [viewer_policies, viewer_scope, viewer_restrict];
const contentMgrs = [
  content_mgr_policies,
  content_mgr_scope,
  content_mgr_restrict,
];
const mods = [mods_policies, mods_scope, mods_restrict];
const mgrs = [mgr_policies, mgr_scope, mgr_restrict];

export const map = [...viewers, ...contentMgrs, ...mods, ...mgrs];
