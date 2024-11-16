import { EmailAddress } from '../../../lib/domain/value-object/EmailAddress';
import { User } from '../user';

describe('User', () => {
  test('it can create user from a firstname, lastname and email address', () => {
    const firstname = 'John';
    const lastname = 'Doe';
    const emailAddress = EmailAddress.from('john.doe@gmail.com');

    const user = User.new({ firstname, lastname, emailAddress });

    expect(user).toBeDefined();
  });
});
