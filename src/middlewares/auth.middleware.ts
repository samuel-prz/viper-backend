import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'

export const requireAuth = (req: Request, res:Response , next: NextFunction) => {
  const token = req.cookies.jwt;
  // check json web token exists
  if (token) {
    try {
        // verify if it is a valid token
        req.currentUser = jwt.verify(token, process.env.TOKEN_SCRT as string) as CurrentUser;
        console.log(`Request made by: user ${req.currentUser.id}`);
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: 'Error on vefify token' }) 
    }
  } else {
    res.status(401).json({ message: 'Access Denied: No token provided' }) 
  }
};