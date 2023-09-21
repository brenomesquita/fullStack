import { Task } from '../../../../domain/entities';
import { ITaskRepository } from '../../../../domain/repositories';
import { UnprocessableContentException } from '../../../../exceptions';
import { DeleteTaskDto } from './delete-tasks.dto';

export class DeleteTaskUseCase {
  private repository!: ITaskRepository;
  constructor(repository: ITaskRepository) {
    this.repository = repository;
  }

  async handle(task: DeleteTaskDto) {
    try {
      const result = await this.repository.delete({
        id: `${task.id}`,
        userId: task.userId,
      });
      return {
        deleted: result,
      };
    } catch (error: any) {
      throw new UnprocessableContentException(
        error.message || 'Unprocessable Entity',
      );
    }
  }
}
