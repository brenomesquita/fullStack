import { Task } from '../../../../domain/entities';
import { ITaskRepository } from '../../../../domain/repositories';
import { UnprocessableContentException } from '../../../../exceptions';
import { ListTaskDto } from './list-tasks.dto';

export class ListTasksUseCase {
  private repository!: ITaskRepository;
  constructor(repository: ITaskRepository) {
    this.repository = repository;
  }

  async handle(user: ListTaskDto) {
    try {
      const result = await this.repository.findMany({
        userId: user.userId,
        description: '',
      });
      return result;
    } catch (error: any) {
      throw new UnprocessableContentException(
        error.message || 'Unprocessable Entity',
      );
    }
  }
}
