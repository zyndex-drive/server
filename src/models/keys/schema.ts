import { Schema } from 'mongoose';
import appendStatics from './statics';
import type { IKey, IKeyDoc, IKeyModel } from './types';

const schema = new Schema<IKeyDoc, IKeyModel, IKey>({
  _id: {
    type: Schema.Types.ObjectId,
  },
  type: {
    type: String,
    required: true,
    unique: true,
  },
  key: {
    type: Object,
    required: true,
  },
});

export default appendStatics(schema);
