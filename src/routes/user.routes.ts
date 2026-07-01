import { Router } from 'express';
import { createUser, getUserSessions } from '../controllers/user.controller';
import { validate } from '../middleware/validate';
import { createUserSchema, getUserSessionsParamsSchema } from '../validators/user.validator';

const router = Router();

router.post('/', validate({ body: createUserSchema }), createUser);
router.get('/:id/sessions', validate({ params: getUserSessionsParamsSchema }), getUserSessions);

export default router;
