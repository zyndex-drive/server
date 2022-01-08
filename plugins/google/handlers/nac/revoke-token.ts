// Axios
import { axios } from '@plugins';

// Others
import api from '@plugins/google/helpers/API';

// Types
import type { IInlineResponse } from '@typs/inline.response';
import type { AxiosError } from 'axios';

/**
 * Revokes a Google Oauth Token (Regresh / Access)
 *
 * @param {string} token - Google Oauth Token to be Revoked
 * @returns {Promise<IInlineResponse<boolean>>} - True / false based on Google Response
 */
export default function (token: string): Promise<IInlineResponse<boolean>> {
  return new Promise<IInlineResponse<boolean>>((resolve, reject) => {
    const url = api.revokeToken;
    const params = `token=${token}`;
    axios
      .post(url, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response) => {
        const returnResp: IInlineResponse<boolean> = {
          success: false,
          data: false,
          error: null,
        };
        if (response.status === 200) {
          returnResp.success = true;
          returnResp.data = true;
          resolve(returnResp);
        } else {
          resolve(returnResp);
        }
      })
      .catch((error: AxiosError) => {
        reject(new Error(`${error.name}: ${error.message}`));
      });
  });
}
