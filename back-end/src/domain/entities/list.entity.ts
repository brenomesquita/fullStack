import { BaseEntity } from './base.entity';

export class List extends BaseEntity {
  constructor(query: string, path: string) {
    super();
    this.query = query;
    this.path = path;
  }
  public query: string;
  public path: string;
}
