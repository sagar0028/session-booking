import dotenv from 'dotenv';

dotenv.config();

const port = Number(process.env.PORT) || 3000;
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error('MONGODB_URI is required');
}

export const env = {
  port,
  mongoUri,
};
