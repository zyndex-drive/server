import {
  viewer as accViewer,
  contentMgr as accCntMgr,
  manager as accMgr,
  moderator as accMods,
} from './accept';

import {
  viewer as blackViewer,
  contentMgr as blackCntMgr,
  manager as blackMgr,
  moderator as blackMods,
} from './blacklist';

import {
  contentMgr as promCntMgr,
  manager as promMgr,
  moderator as promMods,
} from './promote';

export const accept = {
  viewer: accViewer,
  contentMgr: accCntMgr,
  moderator: accMods,
  manager: accMgr,
};

export const blacklist = {
  viewer: blackViewer,
  contentMgr: blackCntMgr,
  moderator: blackMods,
  manager: blackMgr,
};

export const promote = {
  contentMgr: promCntMgr,
  moderator: promMods,
  manager: promMgr,
};

export default {
  accept,
  blacklist,
  promote,
};
