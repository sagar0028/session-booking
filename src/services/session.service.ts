import * as sessionRepository from '../repository/session.repository';
import * as teacherRepository from '../repository/teacher.repository';
import * as userRepository from '../repository/user.repository';
import { AppError } from '../utils/AppError';
import { getDayRange } from '../helpers/helper';
import {
  BookSessionParamsDto,
  BookSessionRequestDto,
  CompleteSessionParamsDto,
  CreateSessionRequestDto,
  GetAvailableSessionsQueryDto,
} from '../dto/session.dto';

export async function createSession(data: CreateSessionRequestDto) {
  const { teacherId, startTime, endTime } = data;

  const teacher = await teacherRepository.findById(teacherId);
  if (!teacher) {
    throw new AppError('Teacher not found', 404);
  }

  return sessionRepository.create({
    teacherId,
    startTime: new Date(startTime),
    endTime: new Date(endTime),
  });
}

export async function getAvailableSessions(query: GetAvailableSessionsQueryDto) {
  const { start, end } = getDayRange(query.dateTimestamp);

  return sessionRepository.findAvailableWithTeacher(start, end);
}

export async function bookSession(params: BookSessionParamsDto, body: BookSessionRequestDto) {
  const { id: sessionId } = params;
  const { userId } = body;

  const user = await userRepository.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  const session = await sessionRepository.bookAvailableSession(sessionId, user._id);
  if (session) {
    return session;
  }

  const existingSession = await sessionRepository.findById(sessionId);
  if (!existingSession) {
    throw new AppError('Session not found', 404);
  }

  throw new AppError('Session is not available for booking', 409);
}

export async function completeSession(params: CompleteSessionParamsDto) {
  const { id: sessionId } = params;

  const session = await sessionRepository.completeBookedSession(sessionId);
  if (session) {
    return session;
  }

  const existingSession = await sessionRepository.findById(sessionId);
  if (!existingSession) {
    throw new AppError('Session not found', 404);
  }

  throw new AppError('Only booked sessions can be completed', 409);
}
