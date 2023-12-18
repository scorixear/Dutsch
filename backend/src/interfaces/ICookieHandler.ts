export default interface ICookieHandler {
  getSession(cookie: string | undefined): string | undefined;
}
