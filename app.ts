import express from 'express';
import userRoutes from './routes/user.routes';
import teacherRoutes from './routes/teacher.routes';
import sessionRoutes from './routes/session.routes';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import { HealthResponseDto } from './dto/common.dto';

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  const response: HealthResponseDto = { status: 'ok' };
  res.json(response);
});

app.use('/users', userRoutes);
app.use('/teachers', teacherRoutes);
app.use('/sessions', sessionRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
