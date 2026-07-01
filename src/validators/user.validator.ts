import Joi from 'joi';
import { objectIdSchema } from './common.validator';

export const createUserSchema = Joi.object({
  fullName: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().trim().required(),
});

export const getUserSessionsParamsSchema = Joi.object({
  id: objectIdSchema.required(),
});
