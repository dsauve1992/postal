import { DomainEvent } from '../../../lib/domain/domain-entity';
import { UserId } from '../user-id';

export class UserCreatedEvent implements DomainEvent {
  key = 'user.created';
  payload: { id: UserId };

  constructor(id: UserId) {
    this.payload = { id };
  }
}
