import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/index.js';
import { getEnvVar} from './utils/getEnvVar.js';
import {errorHandler} from './middlewares/errorHandler.js';
import {notFoundHandler} from './middlewares/notFoundHandler.js';

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
}

export function setupServer() {

const app = express();
const PORT = Number(getEnvVar('PORT', '4000')) || 4000;

app.use(cors());
app.use(express.json());
app.use(cookieParser()); 
app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);

app.get('/test', (req, res) => {
  res.json({ message: 'Test route works!' });
});

app.use('/', router);

app.use(notFoundHandler);

app.use(errorHandler);

/*app.use((req, res) => {
  res.status(404).json({
    message: 'Not found',
  });
});*/

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
}
