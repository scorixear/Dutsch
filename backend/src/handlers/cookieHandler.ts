import ICookieHandler from '../interfaces/ICookieHandler';

export default class CookieHandler implements ICookieHandler {
  public getSession(cookie: string | undefined) {
    if (cookie === undefined) {
      return undefined;
    }
    const sessionCookie = cookie.split(';').filter((c) => c.trim().startsWith('session='));
    return sessionCookie.length > 0 ? sessionCookie[0].trim().split('session=')[1] : undefined;
  }
}
