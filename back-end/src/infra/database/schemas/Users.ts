import { INTEGER, STRING } from 'sequelize';
import sequelize from '../dbConfig';

const UserModel = sequelize.define('Users', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
});

export default UserModel;
