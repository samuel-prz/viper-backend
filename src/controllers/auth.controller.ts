import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { getUserByEmail } from '../queries/user.queries';
import checkPassword from '../utils/checkPassword';
import { User  } from '../models/User';

const invalidCredentials = (res: Response) => { 
  res.status(401).json({ message: 'Datos incorrectos' }) 
}

const createToken = (id: Number) => {
    return jwt.sign(
        { id },
        process.env.TOKEN_SCRT as string, 
        { expiresIn: process.env.TOKEN_EXPIRE }
    );
}

export const login = async (req: Request, res: Response ) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email)
    if(user) { 
      if(await checkPassword(password, user.password) || password === user.password) {
        const token = createToken(user.id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 }); 
        res.status(200).json({ message: 'success', user });
      } else {
        invalidCredentials(res) // when password is wrong 
      }
    } else {
      invalidCredentials(res) // when email is wrong
    }
  } catch (error: any) { 
      console.log('Server error: ', error)
   }  
};

export const logout = async (_req: Request, res: Response ) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.status(200).json({ message: 'success' });
};

export const getUserLoggedIn = async (req: Request, res: Response) => {
  try {
    const { currentUser } = req;
    const userLoggedIn = await User.findOne({ where: { id: currentUser.id, isActive: true } })
    res.status(200).json({ message: 'success', user: userLoggedIn });
  } 
  catch (error: any) { 
      console.log('Server error: ', error)
    }  
};