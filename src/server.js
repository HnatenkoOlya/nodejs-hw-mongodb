import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar} from './utils/getEnvVar.js';
import contactsRouter from './routes/contacts.js';

export function setupServer() {

const app = express();
const PORT = Number(getEnvVar('PORT', '4000')) || 4000;

app.use(cors());
app.use(express.json());
app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);

app.use('/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({
    message: 'Not found',
  });
});

app.get('/test', (req, res) => {
  res.json({ message: 'Test route works!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

}