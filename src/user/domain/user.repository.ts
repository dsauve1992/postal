import { WriteRepository } from '../../lib/domain/write-repository';
import { User } from './user';
import { UserId } from './user-id';

export type UserRepository = WriteRepository<UserId, User>;
