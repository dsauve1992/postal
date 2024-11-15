import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import Knex from 'knex';
import { IntegrationTestService } from './integration-test.service';

@Module({
  controllers: [],
  providers: [
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
  exports: [IntegrationTestService],
})
export class IntegrationTestModule {}
