import express from 'express';
import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import { connect, set } from 'mongoose';
import envs from './envs';
import controllers from '../controllers';
import errorHandler from '../middleware/errorHandler.middleware';

class App {
  public app: express.Application;
  public env: string;
  public port: number | string;

  constructor() {
    this.app = express();
    this.env = envs.env;
    this.port = envs.port;
    this.connectDatabase();
    this.initMiddleware();
    this.initRoutes();
    this.initErrorHandler();
  }

  private connectDatabase() {
    if (this.env === 'development') {
      set('debug', true);
    }
    connect(envs.mongoHost, {
      user: envs.mongoUser,
      pass: envs.mongoPass,
    }).then(() => {
      console.log('\x1b[32mDatabase connected.\x1b[0m');
      console.log('\n');
    });
  }

  private initMiddleware() {
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  private initRoutes() {
    const router = express.Router();

    controllers.forEach(controller => {
      router.use(controller.path, controller.router);
    });

    this.app.use('/v1', router);
  }

  private initErrorHandler() {
    this.app.use(errorHandler);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log('\x1b[31m***************************************************\x1b[0m');
      console.log(`\x1b[32mApp listening on port \x1b[33m${this.port}\x1b[0m`);
      console.log(`\x1b[32mCurrent env: \x1b[33m${this.env} \x1b[0m`);
      console.log('\x1b[31m***************************************************\x1b[0m');
      console.log('\n');
    });
  }
}

export default App;
