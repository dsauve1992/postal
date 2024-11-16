import { Id } from './id';

export interface DomainEvent {
  key: string;
}

export class DomainEntity<T extends Id> {
  readonly id: T;
  private readonly events: DomainEvent[];

  constructor(id: T) {
    this.id = id;
    this.events = [];
  }

  addEvent(event: DomainEvent): void {
    this.events.push(event);
  }

  getAndClearEvents(): DomainEvent[] {
    const currentEvents = [...this.events];
    this.events.length = 0;
    return currentEvents;
  }
}
