export class EnumJazzError extends Error {
  name = 'EnumJazzError';
  message = 'Attribute is invalid enum.';
  constructor(message?: string) {
    super(message);
    if (message) {
      this.message = message;
    }
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
