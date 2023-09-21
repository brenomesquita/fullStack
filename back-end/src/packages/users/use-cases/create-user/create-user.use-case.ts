import { User } from '../../../../domain/entities';
import { IUserRepository } from '../../../../domain/repositories';
import {
  UnprocessableContentException,
  BaseException,
} from '../../../../exceptions';
import { ConflictException } from '../../../../exceptions/conflict.exception';
import { generateHash } from '../../../../utils/crypto';
import { CreateUserDto } from './create-user.dto';

export class CreateUserUseCase {
  private repository!: IUserRepository;
  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  async handle(user: CreateUserDto) {
    try {
      const hash = generateHash(user.password);
      const result = await this.repository.create({
        username: user.username,
        password: hash,
      });
      return result;
    } catch (error: any) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ConflictException('username must be unique');
      }
      throw new UnprocessableContentException(
        error.message || 'Unprocessable Entity',
      );
    }
  }
}
