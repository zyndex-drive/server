// UUID
import { customAlphabet } from 'nanoid';

// API
import api from '@plugins/google/api/iam/service-account/API';

// Google Request Method
import { googleApiRequest } from '@plugins/google/helpers';

// Types
import type { ITokenDoc } from '@models/types';
import type { IGoogleResponse } from '@plugins/google/helpers/types';
import type {
  TIAMApiUrlType,
  IServiceAccountResource,
} from '@plugins/google/api/iam/service-account/types';

// Custom Types

interface IServiceAccountDetails {
  name: string;
  displayName: string;
  description: string;
}

interface IServiceAccCreatePostData {
  accountId: string;
  serviceAccount: IServiceAccountDetails;
}

// Code
const ALPHAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const NUMS = '0123456789';
const ALPHANUMS = `${ALPHAS}${NUMS}`;
const LENGTH = 6;
const alphaUid = customAlphabet(ALPHAS, LENGTH);
const alphaNumUid = customAlphabet(ALPHANUMS, LENGTH);

/**
 * Generates a Unique Service Account ID Following the Google Regexp
 *
 * @returns {string} - Unique Service Account ID
 */
function generateAccountId(): string {
  const firstPart = alphaUid();
  const secondPart = alphaNumUid();
  const thirdPart = alphaNumUid();
  return `${firstPart}-${secondPart}-${thirdPart}`;
}

/**
 * Creates a Service Account in a Particular Project
 *
 * @param {ITokenDoc} token - Token Document from Database
 * @param {string} projectID - Project ID to which service account is to be Created
 * @param {IServiceAccountDetails} serviceAccountDetails - Object Containing Details of the Service Account
 * @returns {Promise<IGoogleResponse<IServiceAccountResource>>} - Promise Resolving to Details of Created Service Account
 */
export default function (
  token: ITokenDoc,
  projectID: string,
  serviceAccountDetails: IServiceAccountDetails,
): Promise<IGoogleResponse<IServiceAccountResource>> {
  const uid = generateAccountId();
  const apiUrl = api.create(projectID);
  const data: IServiceAccCreatePostData = {
    accountId: uid,
    serviceAccount: serviceAccountDetails,
  };
  return googleApiRequest.post<
    TIAMApiUrlType,
    IServiceAccCreatePostData,
    IServiceAccountResource
  >(apiUrl, token, data);
}
