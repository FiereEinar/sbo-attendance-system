import UserModel from '../../models/mongodb/user.model';
import { IUserRepository, User } from '../user.repository';

export class UserRepositoryMongo implements IUserRepository {
	async create(user: User): Promise<User> {
		const doc = await UserModel.create(user);
		return doc.toObject();
	}
	async findById(id: string): Promise<User | null> {
		return UserModel.findById(id).lean();
	}
	async findAll(): Promise<User[]> {
		return UserModel.find().lean();
	}
	async update(id: string, user: Partial<User>): Promise<User | null> {
		return UserModel.findByIdAndUpdate(id, user, { new: true }).lean();
	}
	async delete(id: string): Promise<boolean> {
		const res = await UserModel.findByIdAndDelete(id);
		return !!res;
	}
	async findByQuery(query: Partial<User>): Promise<User[]> {
		return UserModel.find(query).lean();
	}
}
