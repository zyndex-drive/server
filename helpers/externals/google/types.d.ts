export type TGooGScope = `https://www.googleapis.com/auth/${string}`

export interface IGoogTokenResponse {
    access_token: string;
    expires_in: number;
    refresh_token?: string;
    token_type: string;
}
