// Axios
import { axios } from '@plugins';

// Others
import api from '@plugins/google/helpers/API';

// Types
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Revokes a Google Oauth Token (Regresh / Access)
 *
 * @async
 * @param {string} token - Google Oauth Token to be Revoked
 * @returns {Promise<IInlineResponse<boolean>>} - True / false based on Google Response
 */
export default async function (
  token: string,
): Promise<IInlineResponse<boolean>> {
  const url = api.revokeToken;
  const params = `token=${token}`;
  const response = await axios.post(url, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const returnResp: IInlineResponse<boolean> = {
    success: false,
    data: false,
    error: null,
  };
  if (response.status === 200) {
    returnResp.success = true;
    returnResp.data = true;
    return returnResp;
  } else {
    return returnResp;
  }
}
