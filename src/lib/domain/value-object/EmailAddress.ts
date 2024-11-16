import { IllegalArgumentError } from '../error/IllegalArgumentError';

export class EmailAddress {
  static readonly VALIDATION_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  private readonly value: string;

  static validate(value: string) {
    if (!this.VALIDATION_REGEX.test(value)) {
      throw new IllegalArgumentError(
        `Cannot create email address from ${value}`,
      );
    }
  }

  constructor(value: string) {
    EmailAddress.validate(value);
    this.value = value;
  }

  static from(value: string) {
    return new EmailAddress(value);
  }

  toString() {
    return this.value;
  }
}
