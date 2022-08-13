import { Templates } from '@models';
import { AuthModelMethods } from '@plugins/auth/helpers';
import { templates as templatesPolicies } from '@plugins/templates/policies';

import type {
  ITemplate,
  ITemplateDoc,
  ITemplateLeanDoc,
  ITemplateModel,
} from '@models/types';

const policyMap = {
  view: [templatesPolicies.view],
  add: [templatesPolicies.add],
  edit: [templatesPolicies.edit],
  remove: [templatesPolicies.remove],
};

const defaultCheckFunction = () => ({ check: true });

const authCheckFunctions = {
  add: defaultCheckFunction,
  edit: defaultCheckFunction,
  remove: defaultCheckFunction,
};

const templateAuthMethods = new AuthModelMethods<
  ITemplate,
  ITemplateDoc,
  ITemplateLeanDoc,
  ITemplateModel
>(Templates, false, policyMap, authCheckFunctions);

export default templateAuthMethods.createAllFunctions();
