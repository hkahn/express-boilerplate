import { Request, Response, NextFunction } from 'express';
import Controller from './controller';
import { IController } from '../interfaces/express.interface';
import { registerDTO, loginDTO } from '../dtos/user.dto';
import envs from '../config/envs';
import requestValidation from '../middleware/requestValidation.middleware';
import AuthService from '../services/auth.service';

class AuthController extends Controller implements IController {
  public path = '/auth';
  private authService = new AuthService();

  constructor() {
    super();
    this.initRoutes();
  }

  // routes definition
  private initRoutes() {
    // user register
    this.router.post('/register', requestValidation(registerDTO), (req, res, next) => this.register(req, res, next));
    // user login with email and password
    this.router.post('/login', requestValidation(loginDTO), (req, res, next) => this.login(req, res, next));
    // new new accessToken with refresh token
    this.router.get('/tokens', (req, res, next) => this.getNewTokens(req, res, next));
    // patch an individual document
    // this.router.patch(
    //   '/:_id',
    //   requestValidation(exampleParamsDTO, 'params'),
    //   requestValidation(exampleDTO, 'body', true, true, false),
    //   (req, res, next) => this.update(req, res, next),
    // );
    // delete an individual document
    // this.router.delete('/:_id', requestValidation(exampleParamsDTO, 'params'), (req, res, next) =>
    //   this.destroy(req, res, next),
    // );
  }

  // controller functions
  protected async register(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const body: registerDTO = req.body;
      const { accessToken, refreshToken } = await this.authService.register(body);

      // set cookies
      res
        .cookie('accessToken', accessToken, {
          httpOnly: true,
          // access token lives longer in dev mode
          maxAge: envs.env !== 'development' ? 5 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000,
        })
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

      return res.status(201).json({ accessToken, refreshToken });
    } catch (e) {
      return next(e);
    }
  }

  protected async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const body: loginDTO = req.body;
      const { accessToken, refreshToken } = await this.authService.login(body);

      // set cookies
      res
        .cookie('accessToken', accessToken, {
          httpOnly: true,
          // access token lives longer in dev mode
          maxAge: envs.env !== 'development' ? 5 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000,
        })
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

      return res.status(200).json({ accessToken, refreshToken });
    } catch (e) {
      return next(e);
    }
  }

  protected async getNewTokens(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const refreshTokenFromHeader = req.cookies.refreshToken;
      const { accessToken, refreshToken } = this.authService.getNewTokens(refreshTokenFromHeader);
      // const aa = await this.authService.getNewTokens(refreshTokenFromHeader);

      // set cookies
      res
        .cookie('accessToken', accessToken, {
          httpOnly: true,
          // access token lives longer in dev mode
          maxAge: envs.env !== 'development' ? 5 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000,
        })
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

      return res.status(200).json({ accessToken, refreshToken });
    } catch (e) {
      return next(e);
    }
  }

  // protected async show(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  //   try {
  //     const params: exampleParamsDTO = req.params;
  //     const response = await this.exampleService.show(params);
  //     return res.status(200).json(response);
  //   } catch (e) {
  //     return next(e);
  //   }
  // }

  // protected async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  //   try {
  //     const params: exampleParamsDTO = req.params;
  //     const body: exampleDTO = req.body;

  //     const response = await this.exampleService.update(params, body);
  //     return res.status(200).json(response);
  //   } catch (e) {
  //     return next(e);
  //   }
  // }

  // protected async destroy(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  //   try {
  //     const params: exampleParamsDTO = req.params;

  //     const response = await this.exampleService.destroy(params);
  //     return res.status(200).json(response);
  //   } catch (e) {
  //     return next(e);
  //   }
  // }
}

export default AuthController;
