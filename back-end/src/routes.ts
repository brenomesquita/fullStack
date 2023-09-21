import express, { Request, Response } from 'express';
import UsersRoutes from './packages/users/users.routes';
import TasksRoutes from './packages/tasks/tasks.routes';
import ListRoutes from './packages/list/list.routes';
const router = express.Router();

router.use('/search', ListRoutes);
router.use('/users', UsersRoutes);
router.use('/tasks', TasksRoutes);
router.use('/health', (_req: Request, res: Response) => res.status(200).send());

export default router;
