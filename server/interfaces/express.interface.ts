import { Router, Request } from 'express';
import { User } from '../models';

export interface IController {
  path: string;
  router: Router;
}

export interface IReqWithUser extends Request {
  user?: User;
}
