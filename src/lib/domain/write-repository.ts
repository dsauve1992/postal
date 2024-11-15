import { DomainEntity } from './domain-entity';

export interface WriteRepository<I, T extends DomainEntity<I>> {
  save(entity: T): Promise<void>;
  getById(id: I): Promise<T>;
}
