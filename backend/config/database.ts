import { Sequelize } from 'sequelize';
import type { Dialect } from 'sequelize';

const env = process.env.NODE_ENV || 'development';

const config: Record<string, {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: number;
  dialect: Dialect;
  logging: boolean;
  use_env_variable?: string;
  dialectOptions?: { ssl: { require: boolean; rejectUnauthorized: boolean } };
}> = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres' as Dialect,
    logging: false,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres' as Dialect,
    logging: false,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres' as Dialect,
    logging: false,
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false },
    },
  },
};

const dbConfig = config[env];

const sequelize = dbConfig.use_env_variable
  ? new Sequelize(process.env[dbConfig.use_env_variable] as string, {
      dialect: dbConfig.dialect,
      logging: dbConfig.logging,
      dialectOptions: dbConfig.dialectOptions,
      define: { timestamps: true, underscored: true },
    })
  : new Sequelize(dbConfig.database!, dbConfig.username!, dbConfig.password!, {
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: dbConfig.dialect,
      logging: dbConfig.logging,
      define: { timestamps: true, underscored: true },
    });

export { sequelize };
