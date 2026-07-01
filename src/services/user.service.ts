import * as userRepository from '../repository/user.repository';
import * as sessionRepository from '../repository/session.repository';
import { AppError } from '../utils/AppError';
import { CreateUserRequestDto, GetUserSessionsParamsDto } from '../dto/user.dto';

export async function createUser(data: CreateUserRequestDto) {
  return userRepository.create(data);
}

export async function getUserSessions(params: GetUserSessionsParamsDto) {
  const { id: userId } = params;

  const userExists = await userRepository.existsById(userId);
  if (!userExists) {
    throw new AppError('User not found', 404);
  }

  return sessionRepository.findUserSessionsGrouped(userId);
}
