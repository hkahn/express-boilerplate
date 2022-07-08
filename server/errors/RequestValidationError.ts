import { ValidationError } from 'class-validator';

export default class RequestValidationError extends Error {
  public name = 'RequestValidationError';
  public message = 'Error validating request payload.';
  public validationErrors: ValidationError[];

  constructor(validation: ValidationError[]) {
    super();
    this.validationErrors = validation;
  }
}
