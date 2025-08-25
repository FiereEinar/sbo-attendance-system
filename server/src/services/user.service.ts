import { userRepository } from '../repositories';
import { User } from '../repositories/user.repository';

export const createUser = (data: User) => userRepository.create(data);
export const getUser = (id: string) => userRepository.findById(id);
export const listUsers = () => userRepository.findAll();
export const updateUser = (id: string, data: Partial<User>) =>
	userRepository.update(id, data);
export const deleteUser = (id: string) => userRepository.delete(id);
