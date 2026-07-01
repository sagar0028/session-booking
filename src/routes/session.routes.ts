import { Router } from 'express';
import {
  bookSession,
  completeSession,
  createSession,
  getAvailableSessions,
} from '../controllers/session.controller';
import { validate } from '../middleware/validate';
import {
  bookSessionBodySchema,
  bookSessionParamsSchema,
  completeSessionParamsSchema,
  createSessionSchema,
  getAvailableSessionsQuerySchema,
} from '../validators/session.validator';

const router = Router();

router.post('/', validate({ body: createSessionSchema }), createSession);
router.get('/available', validate({ query: getAvailableSessionsQuerySchema }), getAvailableSessions);
router.post('/:id/book', validate({ params: bookSessionParamsSchema, body: bookSessionBodySchema }), bookSession);
router.patch('/:id/complete', validate({ params: completeSessionParamsSchema }), completeSession);

export default router;
