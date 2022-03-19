export interface IInlineResponse<T> {
  success: boolean;
  data: T;
  error: null | Record<string, unknown>;
}
