import Joi from 'joi';

export const createTeacherSchema = Joi.object({
  fullName: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  specialization: Joi.string().trim().required(),
  experience: Joi.number().min(0).required(),
});
