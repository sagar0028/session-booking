import { Router } from 'express';
import { createTeacher } from '../controllers/teacher.controller';
import { validate } from '../middleware/validate';
import { createTeacherSchema } from '../validators/teacher.validator';

const router = Router();

router.post('/', validate({ body: createTeacherSchema }), createTeacher);

export default router;
