import {Request, Response, NextFunction} from 'express';
import jwt, { verify } from 'jsonwebtoken';
interface IPayload{
    _id: string;
    iat: number;
    exp: number;
    _role: string;
}
export const TokenValidation = (req:Request, res: Response, next: NextFunction) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).json('Access Denied!');
    const payload = jwt.verify(token,  process.env.JWT_KEY || 'TOKEN_TEST') as IPayload;
    req.userId = payload._id;
    req.roles = payload._role;
    next();
}