import { Task } from '../entities';
import { IBaseRepository } from './base.repository.interface';

export interface ITaskRepository extends IBaseRepository<Task> {}
