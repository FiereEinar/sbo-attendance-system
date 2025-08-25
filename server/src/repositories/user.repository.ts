export interface User {
	id: string;
	firstname: string;
	lastname: string;
	email: string;
	password: string;
}

export interface IUserRepository {
	create(user: User): Promise<User>;
	findById(id: string): Promise<User | null>;
	findAll(): Promise<User[]>;
	update(id: string, user: Partial<User>): Promise<User | null>;
	delete(id: string): Promise<boolean>;
}
