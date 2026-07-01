import { SessionWithTeacherResponseDto } from './session.dto';

export interface UserResponseDto {
  id: string | null;
  fullName: string;
  email: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateUserRequestDto {
  fullName: string;
  email: string;
  phone: string;
}

export interface CreateUserResponseDto extends UserResponseDto {}

export interface GetUserSessionsParamsDto {
  id: string;
}

export interface UserSessionsResponseDto {
  upcomingSessions: SessionWithTeacherResponseDto[];
  completedSessions: SessionWithTeacherResponseDto[];
}
