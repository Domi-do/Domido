export class HTTPError extends Error {
  constructor(statusCode, message) {
    super();
    this.name = "HTTPError";
    this.statusCode = statusCode;
    this.message = message;
  }
}
