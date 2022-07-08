import { Router, Request, Response, NextFunction } from 'express';

class Controller {
  public router = Router();
  protected index?(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  protected show?(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  protected create?(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  protected update?(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  protected destroy?(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}

export default Controller;
