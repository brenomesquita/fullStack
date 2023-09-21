import { BaseEntity } from './base.entity';

export class User extends BaseEntity {
  constructor(username: string, password: string) {
    super();
    this.username = username;
    this.password = password;
  }
  public username: string;
  public password: string;
}
