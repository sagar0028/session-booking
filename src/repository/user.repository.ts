import { User } from '../models/User';

export async function create(data: { fullName: string; email: string; phone: string }) {
  return User.create(data);
}

export async function findById(id: string) {
  return User.findById(id);
}

export async function existsById(id: string) {
  return User.exists({ _id: id });
}
