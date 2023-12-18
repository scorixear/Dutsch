import { JwtPayload } from 'jsonwebtoken';

export default interface IJWTHandler {
  generateToken(password: string): Promise<string | undefined>;
  verifyToken(token: string | undefined): Promise<JwtPayload | undefined>;
}
