import express from 'express';
import { UserRepository } from '../../infra/repositories';
const userRepository = new UserRepository();
import UserController from './users.controller';
import { CreateUserUseCase } from './use-cases/create-user';
import { FindUserUseCase } from './use-cases/find-user';

const createUSerUseCase = new CreateUserUseCase(userRepository);
const findUserUseCase = new FindUserUseCase(userRepository);
const controller = new UserController(createUSerUseCase, findUserUseCase);

const router = express.Router();

router.route('/signup').post(controller.createUser.bind(controller));
router.route('/login').get(controller.findUser.bind(controller));

export default router;
