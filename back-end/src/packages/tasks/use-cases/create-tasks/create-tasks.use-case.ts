import { Task } from '../../../../domain/entities';
import { ITaskRepository } from '../../../../domain/repositories';
import { UnprocessableContentException } from '../../../../exceptions';
import { CreateTaskDto } from './create-tasks.dto';

export class CreateTaskUseCase {
  private repository!: ITaskRepository;
  constructor(repository: ITaskRepository) {
    this.repository = repository;
  }

  async handle(task: CreateTaskDto) {
    try {
      const result = await this.repository.create({
        userId: task.userId,
        description: task.description,
        dueDate: new Date(task?.dueDate),
      });
      return result as Task;
    } catch (error: any) {
      throw new UnprocessableContentException(
        error.message || 'Unprocessable Entity',
      );
    }
  }
}
