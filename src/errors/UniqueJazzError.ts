export class UniqueJazzError extends Error {
  name = 'UniqueJazzError';
  message = 'Attribute is not unique.';
  constructor(message?: string) {
    super(message);
    if (message) {
      this.message = message;
    }
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
