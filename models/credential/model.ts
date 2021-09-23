import { model } from 'mongoose';
import schema from './schema';
import type { ICredentials, ICredentialsModel } from './types';

export default model<ICredentials, ICredentialsModel>('Credential', schema);
