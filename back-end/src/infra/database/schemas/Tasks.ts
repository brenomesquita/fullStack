import { DATE, INTEGER, STRING } from 'sequelize';
import sequelize from '../dbConfig';

const TaskModel = sequelize.define('Tasks', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: INTEGER,
    allowNull: false,
  },
  description: {
    type: STRING,
    allowNull: false,
  },
  dueDate: {
    type: DATE,
    allowNull: false,
  },
});
//TODO
export default TaskModel;
