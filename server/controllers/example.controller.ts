import { Request, Response, NextFunction } from 'express';
import Controller from './controller';
import { IController } from '../interfaces/express.interface';
import { exampleDTO, exampleParamsDTO, exampleQueryDTO } from '../dtos/example.dto';
import requestValidation from '../middleware/requestValidation.middleware';
import authMiddleware from '../middleware/auth.middleware';
import ExampleService from '../services/example.service';

class ExamplesController extends Controller implements IController {
  public path = '/examples';
  private exampleService = new ExampleService();

  constructor() {
    super();
    this.initRoutes();
  }

  // routes definition
  private initRoutes() {
    // get the list of documents
    this.router.get('/', requestValidation(exampleQueryDTO, 'query'), (req, res, next) => this.index(req, res, next));
    // create a new document
    this.router.post('/', authMiddleware, requestValidation(exampleDTO), (req, res, next) =>
      this.store(req, res, next),
    );
    // get an individual document
    this.router.get('/:_id', requestValidation(exampleParamsDTO, 'params'), (req, res, next) =>
      this.show(req, res, next),
    );
    // patch an individual document
    this.router.patch(
      '/:_id',
      requestValidation(exampleParamsDTO, 'params'),
      requestValidation(exampleDTO, 'body', true, true, false),
      (req, res, next) => this.update(req, res, next),
    );
    // delete an individual document
    this.router.delete('/:_id', requestValidation(exampleParamsDTO, 'params'), (req, res, next) =>
      this.destroy(req, res, next),
    );
  }

  // controller functions
  protected async index(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const query: exampleQueryDTO = req.query;
      const response = await this.exampleService.index(query);
      return res.status(201).json(response);
    } catch (e) {
      return next(e);
    }
  }

  protected async store(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const body: exampleDTO = req.body;
      const response = await this.exampleService.store(body);
      return res.status(201).json(response);
    } catch (e) {
      return next(e);
    }
  }

  protected async show(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const params: exampleParamsDTO = req.params;
      const response = await this.exampleService.show(params);
      return res.status(200).json(response);
    } catch (e) {
      return next(e);
    }
  }

  protected async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const params: exampleParamsDTO = req.params;
      const body: exampleDTO = req.body;

      const response = await this.exampleService.update(params, body);
      return res.status(200).json(response);
    } catch (e) {
      return next(e);
    }
  }

  protected async destroy(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const params: exampleParamsDTO = req.params;

      const response = await this.exampleService.destroy(params);
      return res.status(200).json(response);
    } catch (e) {
      return next(e);
    }
  }
}

export default ExamplesController;
