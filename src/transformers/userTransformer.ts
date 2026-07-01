import { toId } from '../helpers/helper';
import { transformSessionWithTeacher } from './sessionTransformer';
import { UserResponseDto, UserSessionsResponseDto } from '../dto/user.dto';

type UserRecord = {
  _id: unknown;
  fullName: string;
  email: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type SessionRecord = Parameters<typeof transformSessionWithTeacher>[0];

export function transformUser(user: UserRecord): UserResponseDto {
  return {
    id: toId(user._id),
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export function transformUserSessions(data: {
  upcomingSessions: SessionRecord[];
  completedSessions: SessionRecord[];
}): UserSessionsResponseDto {
  return {
    upcomingSessions: data.upcomingSessions.map(transformSessionWithTeacher),
    completedSessions: data.completedSessions.map(transformSessionWithTeacher),
  };
}
