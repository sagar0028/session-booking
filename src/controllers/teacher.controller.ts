import { Request, Response, NextFunction } from 'express';
import * as teacherService from '../services/teacher.service';
import { transformTeacher } from '../transformers/teacherTransformer';
import { CreateTeacherRequestDto, CreateTeacherResponseDto } from '../dto/teacher.dto';

export async function createTeacher(req: Request, res: Response, next: NextFunction) {
  try {
    const body = req.body as CreateTeacherRequestDto;
    const teacher = await teacherService.createTeacher(body);
    const response: CreateTeacherResponseDto = transformTeacher(teacher);
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
}
