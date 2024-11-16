import { EntityEventEmitterRepository } from '../../lib/domain/entity-event-emitter-repository';
import { User } from '../domain/user';
import { UserId } from '../domain/user-id';
import { UserRepository } from '../domain/user.repository';
import { DatabaseClientGetter } from '../../lib/unit-of-work/database-client-getter';
import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EmailAddress } from '../../lib/domain/value-object/EmailAddress';
import { EntityNotFoundError } from '../../lib/domain/error/EntityNotFoundError';

type UserRow = {
  id: string;
  firstname: string;
  lastname: string;
  email_address: string;
};

@Injectable()
export class UserPostgresRepository
  extends EntityEventEmitterRepository<User>
  implements UserRepository
{
  constructor(
    @Inject('UNIT_OF_WORK') private databaseClientGetter: DatabaseClientGetter,
    eventEmitter: EventEmitter2,
  ) {
    super(eventEmitter);
  }

  async getById(id: UserId): Promise<User> {
    const { rows } = await this.databaseClientGetter.getClient().query<UserRow>(
      `
        SELECT
          "user".id as id,
          "user".firstname as firstname,
          "user".lastname as lastname,
          "user".email_address as email_address
        FROM "user" 
        WHERE "user".id = $1
        `,
      [id.toString()],
    );

    if (!rows.length) {
      throw new EntityNotFoundError(id);
    }

    return new User({
      id: UserId.from(rows[0].id),
      firstname: rows[0].firstname,
      lastname: rows[0].lastname,
      emailAddress: EmailAddress.from(rows[0].email_address),
    });
  }

  protected async saveEntity(entity: User): Promise<void> {
    await this.databaseClientGetter
      .getClient()
      .query(
        'INSERT INTO "user" (id, firstname, lastname, email_address) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING',
        [
          entity.id.toString(),
          entity.firstname,
          entity.lastname,
          entity.emailAddress.toString(),
        ],
      );
  }
}
