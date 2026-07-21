import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import indexRoutes from './routes/index.js';

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use('/uploads', express.static(path.resolve('uploads')));

app.use((req, _res, next) => {
  console.log(req.method, req.url);
  next();
});


app.use('/api', indexRoutes);

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default app;
