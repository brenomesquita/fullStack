import crypto from 'crypto';
import { saltRounds } from '../constants/index';
const salt = crypto.randomBytes(saltRounds).toString('hex');

export function generateHash(password: string) {
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return hash;
}

export function validateHash(hash: string, password: string) {
  const hashPassword = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return hash === hashPassword;
}
