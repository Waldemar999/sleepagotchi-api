import express from 'express';
import config from 'config';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import DatabaseRepositiry from './repository/index.js';
import { errorHandler as errorHandlerMiddleware } from './middlewares/errorHandler.js';

dotenv.config();

export class App {
  async run() {
    const port = config.get('app.port');
    const expressApp = express();

    expressApp.use(express.json());
    expressApp.use(express.urlencoded({ extended: false }));

    expressApp.use(routes);

    expressApp.use(errorHandlerMiddleware);

    expressApp.listen(port, async () => {
      try {
        const db = DatabaseRepositiry.getInstance();

        await db.connect();
  
        console.log(`Server listening at http://localhost:${port}`);
      } catch (error) {
        console.error('Server not started!', error);
      }
    });
  }
}

const app = new App();

app.run();
