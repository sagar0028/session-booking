import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';
import { transformUser, transformUserSessions } from '../transformers/userTransformer';
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
  GetUserSessionsParamsDto,
  UserSessionsResponseDto,
} from '../dto/user.dto';

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const body = req.body as CreateUserRequestDto;
    const user = await userService.createUser(body);
    const response: CreateUserResponseDto = transformUser(user);
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
}

export async function getUserSessions(req: Request, res: Response, next: NextFunction) {
  try {
    const params: GetUserSessionsParamsDto = { id: String(req.params.id) };
    const data = await userService.getUserSessions(params);
    const response: UserSessionsResponseDto = transformUserSessions(data);
    res.json(response);
  } catch (err) {
    next(err);
  }
}
