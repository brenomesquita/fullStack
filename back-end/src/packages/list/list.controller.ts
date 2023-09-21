import { NextFunction, Request, Response } from 'express';
import { ListUseCase } from './use-cases/list';
import { ListDto } from './use-cases/list/list-user.dto';

export default class ListController {
  constructor(private readonly listUseCase: ListUseCase) {}

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { query }: any = req.query;
      const response = await this.listUseCase.handle({
        path: `3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
        query,
      });
      return res.status(210).json({
        response,
      });
    } catch (error) {
      return next(error);
    }
  }
}
