import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getUserByUsername } from '../queries/user.queries';
import { encrypt, checkPassword } from '../utils/crypto';
import { User } from '../models/User';

const invalidCredentials = (res: Response) => {
  res.status(401).json({ message: 'Usuario o contraseña incorrectos.' });
};

const createToken = (id: number) => {
  return jwt.sign(
    { id },
        process.env.TOKEN_SCRT as string,
        { expiresIn: process.env.TOKEN_EXPIRE }
  );
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);
    if (user) {
      if (await checkPassword(password, user.password) || password === user.password) {
        const token = encrypt(createToken(user.id));
        res.cookie('uID', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000, sameSite: true }); // recommend to use secure: true
        res.cookie('timeSession', encrypt((Date.now()).toString()));
        const id = user.id;
        res.status(200).json({ message: 200, id });
      } else {
        invalidCredentials(res); // when password is wrong
      }
    } else {
      invalidCredentials(res); // when username is wrong
    }
  } catch (error: any) {
    console.log('Server error: ', error);
  }
};

export const logout = async (_req: Request, res: Response) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.status(200).json({ message: 'success' });
};

export const getUserLoggedIn = async (req: Request, res: Response) => {
  try {
    const { currentUser } = req;
    const userLoggedIn = await User.findOne({ where: { id: currentUser.id, isActive: true } });
    res.status(200).json({ message: 'success', user: userLoggedIn });
  } catch (error: any) {
    console.log('Server error: ', error);
  }
};
