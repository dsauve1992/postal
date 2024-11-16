import { EventEmitter2 } from '@nestjs/event-emitter';
import { DomainEntity } from './domain-entity';

export abstract class EntityEventEmitterRepository<
  T extends DomainEntity<any>,
> {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async save(entity: T): Promise<void> {
    await this.saveEntity(entity);
    const events = entity.getAndClearEvents();
    events.forEach((event) => this.eventEmitter.emit(event.key, event));
  }

  protected abstract saveEntity(entity: T): Promise<void>;
}
