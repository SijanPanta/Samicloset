import { Sequelize } from 'sequelize';
const env = process.env.NODE_ENV || 'development';
const config = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 5432,
        dialect: 'postgres',
        logging: false,
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 5432,
        dialect: 'postgres',
        logging: false,
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: { require: true, rejectUnauthorized: false },
        },
    },
};
const dbConfig = config[env];
const sequelize = dbConfig.use_env_variable
    ? new Sequelize(process.env[dbConfig.use_env_variable], {
        dialect: dbConfig.dialect,
        logging: dbConfig.logging,
        dialectOptions: dbConfig.dialectOptions,
        define: { timestamps: true, underscored: true },
    })
    : new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: dbConfig.dialect,
        logging: dbConfig.logging,
        define: { timestamps: true, underscored: true },
    });
export { sequelize };
//# sourceMappingURL=database.js.map