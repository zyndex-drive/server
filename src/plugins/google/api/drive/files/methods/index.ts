import del from './delete';
import download from './download';
import generateId from './generate-id';
import get from './get';
import list from './list';
import search from './search';

export default {
  delete: del,
  download,
  generate: {
    id: generateId,
  },
  get,
  list,
  search,
};
