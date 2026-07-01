import Joi from 'joi';
import { objectIdSchema } from './common.validator';

export const createSessionSchema = Joi.object({
  teacherId: objectIdSchema.required(),
  startTime: Joi.date().iso().required(),
  endTime: Joi.date().iso().greater(Joi.ref('startTime')).required().messages({
    'date.greater': 'endTime must be after startTime',
  }),
});

export const getAvailableSessionsQuerySchema = Joi.object({
  dateTimestamp: Joi.number().required().messages({
    'number.base': 'dateTimestamp must be a valid number',
  }),
});

export const bookSessionParamsSchema = Joi.object({
  id: objectIdSchema.required(),
});

export const bookSessionBodySchema = Joi.object({
  userId: objectIdSchema.required(),
});

export const completeSessionParamsSchema = Joi.object({
  id: objectIdSchema.required(),
});
