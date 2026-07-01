export interface TeacherResponseDto {
  id: string | null;
  fullName: string;
  email: string;
  specialization: string;
  experience: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateTeacherRequestDto {
  fullName: string;
  email: string;
  specialization: string;
  experience: number;
}

export interface CreateTeacherResponseDto extends TeacherResponseDto {}
