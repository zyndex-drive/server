import { model } from 'mongoose';
import schema from './schema';
import type { ICredentialsDoc } from './types';

export default model<ICredentialsDoc>('Credential', schema);
