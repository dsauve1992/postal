import { Id } from '../id';

export class EntityNotFoundError extends Error {
  constructor(id: Id) {
    super(`Cannot find entity with id: ${id}`);
    Object.setPrototypeOf(this, EntityNotFoundError.prototype);
  }
}
