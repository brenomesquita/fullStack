import { NextFunction, Request, Response } from 'express';
import { CreateUserUseCase } from './use-cases/create-user';
import { CreateUserDto } from './use-cases/create-user/create-user.dto';
import { FindUserUseCase } from './use-cases/find-user';
import { FindUserDto } from './use-cases/find-user/find-user.dto';

export default class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserUseCase: FindUserUseCase,
  ) {}

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { password, username }: CreateUserDto = req.body;
      await this.createUserUseCase.handle({
        username,
        password,
      });
      return res.status(201).send();
    } catch (error) {
      return next(error);
    }
  }

  async findUser(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.query);
      const { password, username }: FindUserDto = req.query;
      const data = await this.findUserUseCase.handle({
        username,
        password,
      });
      return res.status(200).json({
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
