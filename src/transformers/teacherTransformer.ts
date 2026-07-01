import { toId } from '../helpers/helper';
import { TeacherResponseDto } from '../dto/teacher.dto';

type TeacherRecord = {
  _id: unknown;
  fullName: string;
  email: string;
  specialization: string;
  experience: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export function transformTeacher(teacher: TeacherRecord): TeacherResponseDto {
  return {
    id: toId(teacher._id),
    fullName: teacher.fullName,
    email: teacher.email,
    specialization: teacher.specialization,
    experience: teacher.experience,
    createdAt: teacher.createdAt,
    updatedAt: teacher.updatedAt,
  };
}
