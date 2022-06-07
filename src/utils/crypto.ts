import bcrypt from 'bcryptjs';
import crypto from 'crypto-js';

export const checkPassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const encrypt = (val: string) => {
  try {
    const encrypted = crypto.AES.encrypt(val, process.env.CRYPTO_KEY as string).toString();
    return encrypted;
  } catch (error) {
    console.log('Error on encrypt: ', error);
  }
};

export const decrypt = (hash: string) => {
  try {
    const decrypted = crypto.AES.decrypt(hash, process.env.CRYPTO_KEY as string).toString(crypto.enc.Utf8);
    return decrypted;
  } catch (error) {
    console.log('Error on decrypt: ', error);
  }
};
