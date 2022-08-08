import {
  smtp_mailer_view,
  smtp_mailer_add,
  smtp_mailer_edit,
  smtp_mailer_rm,
} from './policies';

export default {
  view: smtp_mailer_view,
  add: smtp_mailer_add,
  edit: smtp_mailer_edit,
  remove: smtp_mailer_rm,
};

export const map = [
  smtp_mailer_view,
  smtp_mailer_add,
  smtp_mailer_edit,
  smtp_mailer_rm,
];
