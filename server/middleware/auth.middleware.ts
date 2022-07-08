import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import envs from '../config/envs';
import HTTPError from '../errors/HTTPError';
import { IReqWithUser } from '../interfaces/express.interface';
import { IUser } from '../models';
import db from '../models/db';

export default async function authMiddleware(req: IReqWithUser, res: Response, next: NextFunction) {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) throw new HTTPError(401, 'Invalid JWT');
  try {
    const userData = verify(accessToken, envs.secretKey) as IUser;
    const user = await db.User.findOne({ _id: userData._id, deletedAt: null });
    if (!user) return next(new HTTPError(401, 'Invalid JWT'));
    req.user = user;
    return next();
  } catch (e) {
    return next(new HTTPError(401, 'Invalid JWT'));
  }
}
