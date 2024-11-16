import { DomainEntity } from '../../lib/domain/domain-entity';
import { UserId } from './user-id';
import { UserCreatedEvent } from './events/user-created-event';
import { EmailAddress } from '../../lib/domain/value-object/EmailAddress';

export type UserProps = {
  id: UserId;
  firstname: string;
  lastname: string;
  emailAddress: EmailAddress;
};

export class User extends DomainEntity<UserId> {
  readonly firstname: string;
  readonly lastname: string;
  readonly emailAddress: EmailAddress;

  constructor(props: UserProps) {
    super(props.id);
    this.firstname = props.firstname;
    this.lastname = props.lastname;
    this.emailAddress = props.emailAddress;
  }

  static new(props: Omit<UserProps, 'id'>) {
    const newUser = new User({ ...props, id: UserId.new() });
    newUser.addEvent(new UserCreatedEvent(newUser.id));
    return newUser;
  }
}
