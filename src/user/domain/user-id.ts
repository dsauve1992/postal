import { IdGenerator } from '../../lib/domain/id-generator';
import { Id } from '../../lib/domain/id';

export class UserId extends Id {
  constructor(private readonly value: string) {
    super();
    this.value = value;
  }
  static getPrefix(): string {
    return 'user';
  }

  static new() {
    return new UserId(IdGenerator.generateNanoId());
  }

  static from(value: string) {
    const [prefix, identifier] = value.split('_');

    if (prefix !== this.getPrefix() || identifier.trim().length === 0) {
      throw new Error(`Invalid UserId ${value}`);
    }

    return new UserId(identifier);
  }

  toString(): string {
    return `${UserId.getPrefix()}_${this.value}`;
  }
}
