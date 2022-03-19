import { model } from 'mongoose';
import schema from './schema';
import type { IOtpDoc, IOtpModel } from './types';

export default model<IOtpDoc, IOtpModel>('Otp', schema);
