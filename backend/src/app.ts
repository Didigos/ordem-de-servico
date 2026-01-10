import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { routes } from './routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware setup
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);
//rotas

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

export { app };