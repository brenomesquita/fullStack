export class CreateTaskDto {
  description!: string;
  dueDate!: Date;
  userId?: string;
}
