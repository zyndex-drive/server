import { model } from 'mongoose';
import schema from './schema';
import type { ICredentialsDoc, ICredentialsModel } from './types';

export default model<ICredentialsDoc, ICredentialsModel>('Credential', schema);
