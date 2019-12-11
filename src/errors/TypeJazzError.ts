export class TypeJazzError extends Error {
  name = 'TypeJazzError';
  message = 'Attribute is invalid type.';
  constructor(message?: string) {
    super(message);
    if (message) {
      this.message = message;
    }
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
