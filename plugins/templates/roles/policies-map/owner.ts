import { map as AllPolicies } from '@plugins/templates/policies';

const ownerPolicies = AllPolicies.map((policy) => policy._id);
export default ownerPolicies;
