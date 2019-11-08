export class InvalidJazzError extends Error {
  name = 'InvalidJazzError';
  message = 'Attribute is invalid.';
  constructor(message?: string) {
    super(message);
    if (message) {
      this.message = message;
    }
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
