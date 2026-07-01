import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { AppError } from '../utils/AppError';

type ValidationSource = 'body' | 'query' | 'params';

type ValidationSchemas = Partial<Record<ValidationSource, Joi.ObjectSchema>>;

const validationOptions: Joi.ValidationOptions = {
  abortEarly: false,
  stripUnknown: true,
  convert: true,
};

function validateSource(req: Request, source: ValidationSource, schema: Joi.ObjectSchema) {
  const { error, value } = schema.validate(req[source], validationOptions);

  if (error) {
    const message = error.details.map((detail) => detail.message).join(', ');
    throw new AppError(message, 400);
  }

  req[source] = value;
}

export function validate(schemas: ValidationSchemas) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      (Object.keys(schemas) as ValidationSource[]).forEach((source) => {
        const schema = schemas[source];
        if (schema) {
          validateSource(req, source, schema);
        }
      });
      next();
    } catch (err) {
      next(err);
    }
  };
}
