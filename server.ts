import app from './app';
import { env } from './config/env';
import { connectDb } from './db/connection';

async function start() {
  await connectDb();

  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
