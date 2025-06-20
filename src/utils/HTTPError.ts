export class HTTPError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super();
    this.name = "HTTPError";
    this.statusCode = statusCode;
    this.message = message;
  }
}
