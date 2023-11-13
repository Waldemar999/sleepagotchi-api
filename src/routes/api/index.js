import { Router } from 'express';
import DatabaseRepositiry from '../../repository/index.js';
import user from './user.js';

const router = Router();

router.use('/user', user);

router.get('/status', async (_req, res) => {
    let isDatabaseAlive = false;
    try {
      await DatabaseRepositiry.getInstance().db.sequelize.authenticate();
      isDatabaseAlive = true;
    } catch (error) {
      console.error('Unable to connect to the database: ', error);
    }

    const data = {
      status: 200,
      name: 'API',
      uptime: process.uptime(),
      health: {
        server: true,
        database: isDatabaseAlive,
      },
    };

    res.json(data);
  });

export default router;
