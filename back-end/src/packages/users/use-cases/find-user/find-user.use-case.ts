import { User } from '../../../../domain/entities';
import { IUserRepository } from '../../../../domain/repositories';
import {
  NotFoundException,
  UnprocessableContentException,
} from '../../../../exceptions';
import { IToken } from '../../../../typings/interfaces';
import { generateHash, generateTokens } from '../../../../utils';
import { FindUserDto } from './find-user.dto';

export class FindUserUseCase {
  private repository!: IUserRepository;
  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  async handle(user: FindUserDto) {
    try {
      const hash = generateHash(user?.password ?? '');
      const result = await this.repository.findOne({
        username: user?.username ?? '',
        password: hash,
      });
      if (result === null || result === undefined) {
        throw new NotFoundException('User not found');
      }
      const token = await generateTokens(result);
      return token as IToken;
    } catch (error: any) {
      throw new UnprocessableContentException(error.message);
    }
  }
}
