import { EmailAddress } from '../value-object/EmailAddress';
import { IllegalArgumentError } from '../error/IllegalArgumentError';

describe('EmailAddress', () => {
  test('it can create from valid email address', () => {
    expect(EmailAddress.from('david.sauve@gmail.com')).toBeDefined();
    expect(EmailAddress.from('ouf_12345@hotmail.fr')).toBeDefined();
    expect(EmailAddress.from('12345@htud.gf')).toBeDefined();
  });

  test('it cannot create from invalid email address', () => {
    expect(() => EmailAddress.from('invalid_email_adress')).toThrow(
      IllegalArgumentError,
    );
    expect(() => EmailAddress.from('$%^&*(@gmail.com')).toThrow(
      IllegalArgumentError,
    );
    expect(() => EmailAddress.from('lololol%gmail.com')).toThrow(
      IllegalArgumentError,
    );
    expect(() => EmailAddress.from('lololol@gmail')).toThrow(
      IllegalArgumentError,
    );
    expect(() => EmailAddress.from('lololol@.com')).toThrow(
      IllegalArgumentError,
    );
  });
});
