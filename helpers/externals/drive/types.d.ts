import type { ITokenDoc } from '@models/tokens/types';

export type TDriveURLType = `https://www.googleapis.com/drive/v3/${string}`;

export interface IDriveResponse {
    success: boolean;
    data?: unknown;
    error?: unknown;
}

export interface IDriveRequest {
    get: (
        api: TDriveURLType,
        token: ITokenDoc,
        params?: Record<string, string | number | boolean>,
        headers?: Record<string, string>
    ) => Promise<IDriveResponse>;
    post: (
        api: TDriveURLType,
        token: ITokenDoc,
        data?: Record<string, string | number | boolean>,
        headers?: Record<string, string>
    ) => Promise<IDriveResponse>
}
