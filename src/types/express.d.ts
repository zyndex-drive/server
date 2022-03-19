declare module 'http' {
  interface IncomingHttpHeaders {
    'x-secret-pass'?: string;
    'x-local-dev-pass'?: string;
    'x-persist-state'?: string;
    'x-lean-doc-request'?: string;
  }
}
