declare module 'http' {
  interface IncomingHttpHeaders {
    'X-SECRET-PASS'?: string;
  }
}
