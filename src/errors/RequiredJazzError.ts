export class RequiredJazzError extends Error {
  name = 'RequiredJazzError';
  message = 'Attribute is required.';
  constructor(message?: string) {
    super(message);
    if (message) {
      this.message = message;
    }
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
