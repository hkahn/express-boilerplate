import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import RequestValidationError from '../errors/RequestValidationError';
import { Request, Response, NextFunction, RequestHandler } from 'express';

const validateRequestPayload = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: any,
  payloadType: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
): RequestHandler => {
  return function (req: Request, res: Response, next: NextFunction) {
    // check if payload is on body, query or params
    const payload =
      payloadType === 'body'
        ? req.body
        : payloadType === 'query'
        ? req.query
        : payloadType === 'params'
        ? req.params
        : req;

    // create DTO instance and validate.
    validate(plainToInstance(type, payload), {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted,
      validationError: {
        target: false,
      },
    }).then(errors => {
      if (errors.length === 0) {
        return next();
      }

      const error = new RequestValidationError(errors);
      return next(error);
    });
  };
};

export default validateRequestPayload;
