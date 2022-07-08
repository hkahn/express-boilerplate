import { NextFunction, Request, Response } from 'express';
import HTTPError from '../errors/HTTPError';
import RequestValidationError from '../errors/RequestValidationError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function errorHandler(
  err: Error | RequestValidationError | HTTPError,
  req: Request,
  res: Response,
  next: NextFunction,
): Response {
  let status = 500;
  const message = 'Something went wrong. Please check with the admin.';

  console.log('The following log is from error handler');
  console.log(err);
  console.log('\n');

  switch (err.name) {
    case 'RequestValidationError':
      status = 400;
      err.message = err.message ? err.message : message;
      break;
    case 'HTTPError':
      if ('status' in err) {
        status = err.status;
      }
      err.message = err.message ? err.message : message;
      break;
    default:
      err.message = message;
  }

  return res.status(status).json(err);
}
