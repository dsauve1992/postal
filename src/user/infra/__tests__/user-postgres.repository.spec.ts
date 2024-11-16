import { Test, TestingModule } from '@nestjs/testing';
import { UserPostgresRepository } from '../user-postgres.repository';
import { IntegrationTestService } from '../../../lib/test/db-integration/integration-test.service';
import { IntegrationTestModule } from '../../../lib/test/db-integration/integration-test.module';
import { User } from '../../domain/user';
import { EmailAddress } from '../../../lib/domain/value-object/EmailAddress';
import { UserId } from '../../domain/user-id';
import { EntityNotFoundError } from '../../../lib/domain/error/EntityNotFoundError';

describe('UserPostgresRepository specs', () => {
  let repository: UserPostgresRepository;
  let integrationTestService: IntegrationTestService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [IntegrationTestModule],
      providers: [UserPostgresRepository],
    }).compile();

    repository = app.get(UserPostgresRepository);
    integrationTestService = app.get(IntegrationTestService);
    await integrationTestService.start();
  });

  beforeEach(async () => {
    const client = await integrationTestService.pool.connect();
    await client.query('DELETE FROM "user";');
    client.release();
  });

  afterAll(async () => integrationTestService.stop());

  test('given a user, when save it, it should be persisted into repository', async () => {
    const user = User.new({
      firstname: 'John',
      lastname: 'Doe',
      emailAddress: EmailAddress.from('john.doe@gmail.com'),
    });

    await repository.save(user);
    const actual = await repository.getById(user.id);

    expect(actual).toEqual(user);
  });

  test('it must throw an Error when user is not found', async () => {
    await expect(() => repository.getById(UserId.new())).rejects.toThrow(
      EntityNotFoundError,
    );
  });
});
