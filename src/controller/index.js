import { Router } from 'express';
import api from './api/index.js'
import DatabaseRepository from '../repository/index.js';

const router = Router();

router.use('/api', api);

  /**
    * @openapi
    * /status:
    *  get:
    *     tags:
    *     - Healthcheck
    *     description: Responds if the app is up and running
    *     responses:
    *       200:
    *         description: App is up and running
    */
  router.get('/status', async (_req, res) => {
    let isDatabaseAlive = false;
    try {
      await DatabaseRepository.getInstance().db.sequelize.authenticate();
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
