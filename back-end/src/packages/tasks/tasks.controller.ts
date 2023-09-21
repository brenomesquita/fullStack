import { NextFunction, Response } from 'express';
import { CreateTaskUseCase } from './use-cases/create-tasks';
import { CreateTaskDto } from './use-cases/create-tasks/create-tasks.dto';
import { DeleteTaskUseCase } from './use-cases/delete-task';
import { DeleteTaskDto } from './use-cases/delete-task/delete-tasks.dto';
import { ListTasksUseCase } from './use-cases/list-tasks';
import { UpdateTaskUseCase } from './use-cases/update-task';
import { UpdateTaskDto } from './use-cases/update-task/update-task.dto';

export default class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly listTasksUseCase: ListTasksUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
  ) {}

  async createTask(req: any, res: Response, next: NextFunction): Promise<any> {
    try {
      const id = req?.id;
      const { description, dueDate }: CreateTaskDto = req.body;
      const task = await this.createTaskUseCase.handle({
        userId: id,
        description,
        dueDate,
      });
      return res.status(201).json({
        data: task,
      });
    } catch (error) {
      return next(error);
    }
  }

  async listTask(req: any, res: Response, next: NextFunction) {
    try {
      const id = req?.id;
      const task = await this.listTasksUseCase.handle({
        userId: id,
      });
      return res.status(200).json({
        data: task,
      });
    } catch (error) {
      return next(error);
    }
  }

  async updateTask(req: any, res: Response, next: NextFunction) {
    try {
      const userId = req?.id;
      const { description, dueDate, id }: UpdateTaskDto = req.body;
      const task = await this.updateTaskUseCase.handle({
        userId,
        description,
        dueDate,
        id,
      });
      return res.status(200).json({
        data: task,
      });
    } catch (error) {
      return next(error);
    }
  }

  async deleteTask(req: any, res: Response, next: NextFunction) {
    try {
      const userId = req?.id;
      const { id }: DeleteTaskDto = req.body;
      const task = await this.deleteTaskUseCase.handle({
        userId,
        id,
      });
      return res.status(200).json({
        data: task,
      });
    } catch (error) {
      return next(error);
    }
  }
}
