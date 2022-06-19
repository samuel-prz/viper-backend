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
      next();
    } catch (error) {
      res.status(401).json({ message: 'Error on verify token.' });
    }
  } else {
    // If token is not valid, check if the session is expired by comparing the time of the last session with the current time
    if (parseInt(timeSession ?? '') + expiration < Date.now()) {
      // code 440 is for session expired, 440 Login Time-out
      res.status(440).json({ message: 'Session expired.' });
    } else {
      // If the session is not expired, continue with the request with unvalid token error 401
      res.status(401).json({ message: 'No token provided.' });
    }
  }
};
