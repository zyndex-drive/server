import { map as AllPolicies } from '@setup/policies';

const ownerPolicies = AllPolicies.map((policy) => policy._id);
export default ownerPolicies;
