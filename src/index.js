import express from 'express';
import config from 'config';
import routes from './routes/index.js';
import DatabaseRepositiry from './repository/index.js';

export class App {
    async run() {
        const port = config.get('app.port');
        const expressApp = express();

        // expressApp.use(express.json());
        expressApp.use(express.urlencoded({ extended: false }));

        expressApp.use(routes);

        expressApp.listen(port, async () => {
            const db = DatabaseRepositiry.getInstance();

            await db.connect();

            console.log(`Server listening at http://localhost:${port}`);

            //TODO: add error case handling
        });
    }
}

const app = new App();

app.run();