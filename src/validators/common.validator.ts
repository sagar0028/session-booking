import Joi from 'joi';

export const objectIdSchema = Joi.string().hex().length(24).messages({
  'string.hex': 'Invalid id',
  'string.length': 'Invalid id',
});
