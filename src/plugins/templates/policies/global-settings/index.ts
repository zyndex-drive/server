import { global_settings_view, global_settings_edit } from './policies';

export default {
  view: global_settings_view,
  edit: global_settings_edit,
};

export const map = [global_settings_view, global_settings_edit];
