export default class HTTPError extends Error {
  public name = 'HTTPError';
  public status = 500;
  public message = 'Something went wrong. Please check with the admin.';

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }
}
