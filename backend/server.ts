import 'dotenv/config';
import { sequelize } from './config/database.js';
import app from './app.js';
import { logger } from './config/logger.js';

const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    logger.info('Database Connected');
    app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err: Error) => {
    logger.error(err, 'Database Connection Failed');
  });
