import { Task } from '../../../../domain/entities';
import { ITaskRepository } from '../../../../domain/repositories';
import { UnprocessableContentException } from '../../../../exceptions';
import { UpdateTaskDto } from './update-task.dto';

export class UpdateTaskUseCase {
  private repository!: ITaskRepository;
  constructor(repository: ITaskRepository) {
    this.repository = repository;
  }

  async handle(task: UpdateTaskDto) {
    try {
      const result = await this.repository.updateOne({
        userId: task.userId,
        description: task.description,
        dueDate: new Date(task?.dueDate),
        id: task.id,
      });
      return {
        updated: result,
      };
    } catch (error: any) {
      throw new UnprocessableContentException(
        error.message || 'Unprocessable Entity',
      );
    }
  }
}
