require('dotenv').config();

import App from './app';
import { RegisterRoutes } from './routes/routes';

const server = new App();

RegisterRoutes(server.app);
server.start();
