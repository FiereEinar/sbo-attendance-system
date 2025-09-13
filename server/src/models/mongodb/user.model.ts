import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IUser extends mongoose.Document {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
}

const UserSchema = new Schema<IUser>({
	firstname: { type: String, minlength: 1, maxlength: 50, required: true },
	lastname: { type: String, minlength: 1, maxlength: 50, required: true },
	email: { type: String, required: false, unique: true },
	password: { type: String, required: true },
});

UserSchema.methods.omitPassword = function () {
	const user = this.toObject();
	delete user.password;
	return user;
};

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
