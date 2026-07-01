import * as teacherRepository from '../repository/teacher.repository';
import { CreateTeacherRequestDto } from '../dto/teacher.dto';

export async function createTeacher(data: CreateTeacherRequestDto) {
  return teacherRepository.create(data);
}
