export interface User {
	id: string;
	firstname: string;
	lastname: string;
	email: string;
	password: string;
}

export type SafeUser = Omit<User, 'password'>;

export interface IUserRepository {
	create(user: User): Promise<User>;
	findById(id: string): Promise<User | null>;
	findAll(): Promise<User[]>;
	update(id: string, user: Partial<User>): Promise<User | null>;
	delete(id: string): Promise<boolean>;
	findByQuery(query: Partial<User>): Promise<User[]>;
}
