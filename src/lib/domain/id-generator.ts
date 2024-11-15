import { v4 as uuidv4 } from 'uuid';

export class IdGenerator {
  static generateNanoId() {
    return uuidv4();
  }
}
