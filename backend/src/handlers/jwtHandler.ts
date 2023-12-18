import jwt, { JwtPayload } from 'jsonwebtoken';
import { Logger } from '../utils/logger';
import IJWTHandler from '../interfaces/IJWTHandler';

export default class JWTHandler implements IJWTHandler {
  public async generateToken(password: string) {
    if (password === process.env.ADMIN_PASSWORD) {
      return jwt.sign(
        {
          data: 'admin'
        },
        process.env.JWT_SECRET ?? '',
        { expiresIn: '1d' }
      );
    } else {
      return undefined;
    }
  }

  public async verifyToken(token: string | undefined) {
    if (token === undefined) {
      return undefined;
    }
    try {
      return jwt.verify(token, process.env.JWT_SECRET ?? '') as JwtPayload;
    } catch (err) {
      Logger.Instance.info('Exception when Verifying Cookie');
      return undefined;
    }
  }
}
