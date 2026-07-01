import { Request, Response, NextFunction } from 'express';
import * as sessionService from '../services/session.service';
import {
  transformAvailableSessions,
  transformSession,
} from '../transformers/sessionTransformer';
import {
  BookSessionParamsDto,
  BookSessionRequestDto,
  CompleteSessionParamsDto,
  CreateSessionRequestDto,
  CreateSessionResponseDto,
  GetAvailableSessionsQueryDto,
  GetAvailableSessionsResponseDto,
  BookSessionResponseDto,
  CompleteSessionResponseDto,
} from '../dto/session.dto';

export async function createSession(req: Request, res: Response, next: NextFunction) {
  try {
    const body = req.body as CreateSessionRequestDto;
    const session = await sessionService.createSession(body);
    const response: CreateSessionResponseDto = transformSession(session);
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
}

export async function getAvailableSessions(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query as unknown as GetAvailableSessionsQueryDto;
    const sessions = await sessionService.getAvailableSessions(query);
    const response: GetAvailableSessionsResponseDto = transformAvailableSessions(sessions);
    res.json(response);
  } catch (err) {
    next(err);
  }
}

export async function bookSession(req: Request, res: Response, next: NextFunction) {
  try {
    const params: BookSessionParamsDto = { id: String(req.params.id) };
    const body = req.body as BookSessionRequestDto;
    const session = await sessionService.bookSession(params, body);
    const response: BookSessionResponseDto = transformSession(session);
    res.json(response);
  } catch (err) {
    next(err);
  }
}

export async function completeSession(req: Request, res: Response, next: NextFunction) {
  try {
    const params: CompleteSessionParamsDto = { id: String(req.params.id) };
    const session = await sessionService.completeSession(params);
    const response: CompleteSessionResponseDto = transformSession(session);
    res.json(response);
  } catch (err) {
    next(err);
  }
}
