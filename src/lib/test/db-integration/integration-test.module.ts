import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import Knex from 'knex';
import { IntegrationTestService } from './integration-test.service';
import { AutoCommitUnitOfWork } from '../../unit-of-work/auto-commit-unit-of-work.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [],
  providers: [
    {
      provide: 'UNIT_OF_WORK',
      useClass: AutoCommitUnitOfWork,
    },
    {
      provide: 'PG_CONNECTION_POOL',
      useValue: new Pool({
        host: global.__dbConfig__.host,
        port: global.__dbConfig__.port,
        user: global.__dbConfig__.user,
        password: global.__dbConfig__.password,
        database: global.__dbConfig__.database,
      }),
    },
    {
      provide: 'KNEX',
      useValue: Knex({
        client: 'pg',
        connection: {
          host: global.__dbConfig__.host,
          port: global.__dbConfig__.port,
          user: global.__dbConfig__.user,
          password: global.__dbConfig__.password,
          database: global.__dbConfig__.database,
        },
      }),
    },
    IntegrationTestService,
  ],
  exports: [IntegrationTestService, 'UNIT_OF_WORK'],
})
export class IntegrationTestModule {}
