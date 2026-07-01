import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError';
import { ErrorResponseDto } from '../dto/common.dto';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    const response: ErrorResponseDto = { message: err.message };
    res.status(err.statusCode).json(response);
    return;
  }

  if (err.name === 'ValidationError') {
    const response: ErrorResponseDto = { message: err.message };
    res.status(400).json(response);
    return;
  }

  if (err.name === 'CastError') {
    const response: ErrorResponseDto = { message: 'Invalid id' };
    res.status(400).json(response);
    return;
  }

  if ((err as { code?: number }).code === 11000) {
    const response: ErrorResponseDto = { message: 'Email already exists' };
    res.status(409).json(response);
    return;
  }

  console.error(err);
  const response: ErrorResponseDto = { message: 'Something went wrong' };
  res.status(500).json(response);
}
