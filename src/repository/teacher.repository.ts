import { Teacher } from '../models/Teacher';

export async function create(data: {
  fullName: string;
  email: string;
  specialization: string;
  experience: number;
}) {
  return Teacher.create(data);
}

export async function findById(id: string) {
  return Teacher.findById(id);
}
