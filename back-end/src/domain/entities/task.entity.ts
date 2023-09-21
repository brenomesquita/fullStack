import { BaseEntity } from './base.entity';

export class Task extends BaseEntity {
  constructor(description: string, dueDate: Date, userId: string) {
    super();
    this.description = description;
    this.dueDate = dueDate;
    this.userId = userId;
  }
  public description?: string;
  public dueDate?: Date;
  public userId?: string;
}
