import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const signJWT = (
  payload: string | Record<string, string | number> | Buffer,
  expiresIn: string,
): string => {
  return jwt.sign(payload, `${process.env.JWT_SECRET}`, { expiresIn });
};

export const extractJWT = (token: string): Record<string, string | number> => {
  return jwt.verify(token, `${process.env.JWT_SECRET}`) as Record<
    string,
    string | number
  >;
};
