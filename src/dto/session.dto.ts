import { SessionStatus } from '../models/Session';
import { TeacherResponseDto } from './teacher.dto';

export interface SessionResponseDto {
  id: string | null;
  teacherId: string | null;
  userId: string | null;
  startTime: Date;
  endTime: Date;
  status: SessionStatus | string;
  completedAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SessionWithTeacherResponseDto extends SessionResponseDto {
  teacher: TeacherResponseDto;
}

export interface CreateSessionRequestDto {
  teacherId: string;
  startTime: string | Date;
  endTime: string | Date;
}

export interface CreateSessionResponseDto extends SessionResponseDto {}

export interface GetAvailableSessionsQueryDto {
  dateTimestamp: number;
}

export type GetAvailableSessionsResponseDto = SessionWithTeacherResponseDto[];

export interface BookSessionParamsDto {
  id: string;
}

export interface BookSessionRequestDto {
  userId: string;
}

export interface BookSessionResponseDto extends SessionResponseDto {}

export interface CompleteSessionParamsDto {
  id: string;
}

export interface CompleteSessionResponseDto extends SessionResponseDto {}
