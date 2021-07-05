import { map as userMap } from './user';
import { map as credsMap } from './credentials';

export { default as user } from './user';
export { default as credentials } from './credentials';

export const map = [...userMap, ...credsMap];
