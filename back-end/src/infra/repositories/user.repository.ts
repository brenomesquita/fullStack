import { User } from '../../domain/entities';
import { IUserRepository } from '../../domain/repositories';
import UserModel from '../database/schemas/Users';
import { BaseRepository } from './base.repository';

export class UserRepository extends BaseRepository implements IUserRepository {
  private entity;
  constructor() {
    super();
    this.entity = UserModel;
  }

  async create(user: User): Promise<User> {
    const result: { dataValues: User } = await this.entity.create({
      username: user.username,
      password: user.password,
    });
    return result.dataValues as User;
  }

  async findOne(user: User): Promise<User | null> {
    const result: { dataValues: User } | null = await this.entity.findOne({
      where: {
        username: user.username,
        password: user.password,
      },
    });
    return result?.dataValues as User;
  }

  async findMany(entity: User): Promise<User[] | null> {
    return null;
  }

  async updateOne(entity: User): Promise<boolean> {
    return false;
  }

  async delete(entity: User): Promise<boolean> {
    return false;
  }
}
