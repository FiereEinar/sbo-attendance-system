import mongoose from 'mongoose';
import { User } from '../../schemas/user.schema';

const Schema = mongoose.Schema;

const UserSchema = new Schema<User>({
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
