import { UserId } from '../user-id';

describe('Id', () => {
  test('it should generate random id', () => {
    expect(UserId.new()).not.toEqual(UserId.new());
  });

  test('it can create manual id', () => {
    expect(UserId.from('user_12345')).toBeDefined();
  });

  test('two id with same value are equals', () => {
    expect(UserId.from('user_12345')).toEqual(UserId.from('user_12345'));
  });

  test('two id with different value are not equals', () => {
    expect(UserId.from('user_12345')).not.toEqual(UserId.from('user_098765'));
  });

  test('id must respect pattern <<prefix>>_value', () => {
    expect(() => UserId.from('_12345')).toThrow();
    expect(() => UserId.from('user_')).toThrow();
    expect(() => UserId.from('user_     ')).toThrow();
    expect(() => UserId.from('user+12345')).toThrow();
    expect(() => UserId.from('user12345')).toThrow();
  });

  test('when stringify, it should match initial value', () => {
    const anId = UserId.from('user_12345');

    expect(UserId.from(anId.toString())).toEqual(anId);
  });
});
