import sequelize from './dbConfig';
import TaskModel from './schemas/Tasks';
import UserModel from './schemas/Users';

export class DatabaseSync {
  constructor() {}
  async sync() {
    TaskModel.hasOne(UserModel, {
      foreignKey: 'userId',
    });
    UserModel.belongsTo(TaskModel);
    await TaskModel.sync({ force: true });
    await UserModel.sync({ force: true });
    await sequelize.sync();
    console.log('database synced');
  }
}
