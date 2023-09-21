import express from 'express';
import { TaskRepository } from '../../infra/repositories';
const taskRepository = new TaskRepository();
import UserController from './tasks.controller';
import { CreateTaskUseCase } from './use-cases/create-tasks';
import { DeleteTaskUseCase } from './use-cases/delete-task';
import { ListTasksUseCase } from './use-cases/list-tasks';
import { UpdateTaskUseCase } from './use-cases/update-task';

const createTaskUseCase = new CreateTaskUseCase(taskRepository);
const listTasksUseCase = new ListTasksUseCase(taskRepository);
const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);

const controller = new UserController(
  createTaskUseCase,
  listTasksUseCase,
  updateTaskUseCase,
  deleteTaskUseCase,
);

const router = express.Router();

router.route('/create').post(controller.createTask.bind(controller));
router.route('/list').get(controller.listTask.bind(controller));
router.route('/update').put(controller.updateTask.bind(controller));
router.route('/delete').delete(controller.deleteTask.bind(controller));

export default router;
