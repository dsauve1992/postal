import { Id } from './id';

export class DomainEvent {
  key: string;
  payload: any;
}

export class DomainEntity<T extends Id> {
  readonly id: T;
  private readonly events: DomainEvent[];

  // Add an event to the entity
  addEvent(event: DomainEvent): void {
    this.events.push(event);
  }

  // Retrieve and clear events (for triggering and resetting)
  getAndClearEvents(): DomainEvent[] {
    const currentEvents = [...this.events];
    this.events.length = 0;
    return currentEvents;
  }
}
