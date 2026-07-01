import { toId } from '../helpers/helper';
import { transformTeacher } from './teacherTransformer';
import {
  SessionResponseDto,
  SessionWithTeacherResponseDto,
  GetAvailableSessionsResponseDto,
} from '../dto/session.dto';

type SessionRecord = {
  _id: unknown;
  teacherId: unknown;
  userId?: unknown | null;
  startTime: Date;
  endTime: Date;
  status: string;
  completedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
  teacher?: Parameters<typeof transformTeacher>[0];
};

export function transformSession(session: SessionRecord): SessionResponseDto {
  return {
    id: toId(session._id),
    teacherId: toId(session.teacherId),
    userId: toId(session.userId),
    startTime: session.startTime,
    endTime: session.endTime,
    status: session.status,
    completedAt: session.completedAt ?? null,
    createdAt: session.createdAt,
    updatedAt: session.updatedAt,
  };
}

export function transformSessionWithTeacher(session: SessionRecord): SessionWithTeacherResponseDto {
  const transformed = transformSession(session);

  return {
    ...transformed,
    teacher: transformTeacher(session.teacher!),
  };
}

export function transformAvailableSessions(sessions: SessionRecord[]): GetAvailableSessionsResponseDto {
  return sessions.map(transformSessionWithTeacher);
}
