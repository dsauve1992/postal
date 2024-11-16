import { Module } from '@nestjs/common';
import { UserPostgresRepository } from './infra/user-postgres.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'USER_REPOSITORY',
      useClass: UserPostgresRepository,
    },
  ],
})
export class UserModule {}
