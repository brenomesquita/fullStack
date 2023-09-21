import { Task } from '../../domain/entities';
import { ITaskRepository } from '../../domain/repositories';
import TaskModel from '../database/schemas/Tasks';
import { BaseRepository } from './base.repository';

export class TaskRepository extends BaseRepository implements ITaskRepository {
  private entity;
  constructor() {
    super();
    this.entity = TaskModel;
  }

  async create(task: Task): Promise<Task> {
    const result: { dataValues: Task } = await this.entity.create({
      userId: Number(task.userId),
      description: task.description,
      dueDate: task?.dueDate,
    });
    return result.dataValues as Task;
  }

  async findOne(task: Task): Promise<Task | null> {
    return null;
  }

  async findMany(task: Task): Promise<Task[] | null> {
    const result: any = await this.entity.findAll({
      where: {
        userId: Number(task.userId),
      },
      order: [['dueDate', 'ASC']],
    });
    const taskArray: any = new Map();
    result.forEach((element: any) => {
      taskArray.set(element.dataValues.id, element.dataValues);
    });

    return [...taskArray.values()] as Task[];
  }

  async updateOne(task: Task): Promise<boolean> {
    const result: any = await this.entity.update(
      {
        description: task.description,
        dueDate: task.dueDate,
      },
      {
        where: {
          userId: task.userId,
          id: task.id,
        },
      },
    );
    if (result[0]) return true;
    return false;
  }

  async delete(task: Task): Promise<boolean> {
    const result: any = await this.entity.destroy({
      where: {
        id: task.id,
        userId: task.userId,
      },
    });
    if (result) return true;
    return false;
  }
}
