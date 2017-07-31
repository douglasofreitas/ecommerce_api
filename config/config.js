import dotenv from 'dotenv';

dotenv.config();
export default {
  database: process.env.database,
  username: process.env.database_user,
  password: process.env.database_password,
  params: {
    port: 3306,
    host: process.env.database_host,
    dialect: 'mysql',
    define: {
      underscored: true,
    },
  },
  jwtSecret: 'SecretEcommerceBook',
  jwtSession: { session: false },
};
