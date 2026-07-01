import express, { Request, Response } from 'express';
import cors from 'cors';
import indexRoutes from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', indexRoutes);

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default app;
