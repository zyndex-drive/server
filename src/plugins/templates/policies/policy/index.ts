import { policies_view, policies_edit } from './policies';

export default {
  view: policies_view,
  edit: policies_edit,
};

export const map = [policies_view, policies_edit];
