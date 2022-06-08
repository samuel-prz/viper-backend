import { Request, Response, NextFunction } from 'express';
import { decrypt } from '../utils/crypto';
import jwt from 'jsonwebtoken';

export const requireAuth = (req: Request, res:Response, next: NextFunction) => {
  const token = decrypt(req.cookies.uID);
  const timeSession = decrypt(req.cookies.timeSession);
  const expiration = (10 * 60 * 60 * 1000); // 10 hours
  // check json web token exists
  if (token) {
    try {
      // verify if it is a valid token
      req.currentUser = jwt.verify(token, process.env.TOKEN_SCRT as string) as CurrentUser;
      console.log(`Request made by: user ${req.currentUser.id}`);
      next();
    } catch (error) {
      res.status(401).json({ message: 'Error on vefify token' });
    }
  } else {
    console.log('Tu sesión a caducado: ' + (parseInt(timeSession ?? '') + 40 < Date.now()));
    if (parseInt(timeSession ?? '') + expiration < Date.now()) {
      // code 3 is for session expired
      res.status(401).json({ code: 3, message: 'Tu sesión a caducado. Inicia nuevamente.' });
    } else {
      res.status(401).json({ message: 'No token provided.' });
    }
  }
};
