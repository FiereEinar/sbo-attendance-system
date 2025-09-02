import { userRepository } from '../repositories';
import { SafeUser, User } from '../repositories/user.repository';

// function excludePassword<T extends { password?: any }>(user: T) {
//   const { password, ...safeUser } = user;
//   return safeUser;
// }

export const createUser = async (data: User): Promise<SafeUser> => {
	const user = await userRepository.create(data);
	const { password, ...safeUser } = user;
	return safeUser;
};

export const getUser = (id: string) => userRepository.findById(id);

export const listUsers = () => userRepository.findAll();

export const updateUser = (id: string, data: Partial<User>) =>
	userRepository.update(id, data);

export const deleteUser = (id: string) => userRepository.delete(id);

export const findUsersByQuery = (query: Partial<User>) =>
	userRepository.findByQuery(query);
// export const findUsersByQuery = async (
// 	query: Partial<User>
// ): Promise<SafeUser[]> => {
// 	const users = await userRepository.findByQuery(query);
// 	return users.map(({ password, ...safeUser }) => safeUser);
// };
