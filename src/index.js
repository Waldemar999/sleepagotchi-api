import express from 'express';
import config from 'config';
import dotenv from 'dotenv';

import routes from './controller/index.js';
import DatabaseRepositiry from './repository/index.js';
import { errorHandler as errorHandlerMiddleware } from './middlewares/errorHandler.js';
import swaggerDocs from './utils/swagger.js';

dotenv.config();

class App {
  constructor() {
    this.config = config.get('app');
    this.databaseRepositiry = DatabaseRepositiry.getInstance();
  }

  async run() {
    const { port } = this.config;
    const expressApp = express();

    expressApp.use(express.json());
    expressApp.use(express.urlencoded({ extended: false }));

    expressApp.use(routes);

    expressApp.use(errorHandlerMiddleware);

    expressApp.listen(port, async () => {
      try {
        await this.databaseRepositiry.connect();

        console.log(`Server listening at http://localhost:${port}`);
      } catch (error) {
        console.error('Server not started!', error);
      }
    });

    swaggerDocs(expressApp, port);
  }
}

const app = new App();

app.run();
