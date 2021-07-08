import { IFrontendDoc, IFrontendModel } from './types';

/**
 *
 * @param {IFrontendModel} this - Frontend Model
 * @returns {IFrontendDoc[]} list of frontend Data
 */
export async function getFrontendUrls(
  this: IFrontendModel,
): Promise<IFrontendDoc[]> {
  return this.find({}, '_id domain name');
}
