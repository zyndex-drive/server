import { users } from '@plugins/templates/policies';

const policies = [
  users.add.accept.contentMgr._id,
  users.add.accept.viewer._id,
  users.blacklist.manager._id,
  users.blacklist.viewer._id,
  users.modify.contentMgr.policy._id,
  users.modify.contentMgr.restrict._id,
  users.modify.contentMgr.scope._id,
  users.modify.viewer.policy._id,
  users.modify.viewer.restrict._id,
  users.modify.viewer.scope._id,
];

export default policies;
