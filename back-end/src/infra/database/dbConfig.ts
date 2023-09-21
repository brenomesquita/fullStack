import { Sequelize } from 'sequelize';
const sequelize = new Sequelize(
  process.env.DB_SCHEMA || 'postgres',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: '172.16.238.2',
    port: 5432,
    dialect: 'postgres',
  },
);

export default sequelize;
