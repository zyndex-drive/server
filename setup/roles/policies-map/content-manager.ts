import { users, frontends } from '@setup/policies';

const policies = [
  users.add.accept.viewer._id,
  users.blacklist.viewer._id,
  users.modify.viewer.policy._id,
  users.modify.viewer.restrict._id,
  users.modify.viewer.scope._id,
  frontends.edit._id,
];

export default policies;
