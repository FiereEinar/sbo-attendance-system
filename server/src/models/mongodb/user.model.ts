import mongoose from 'mongoose';
import { User } from '../../repositories/user.repository';

const Schema = mongoose.Schema;

const UserSchema = new Schema<User>({
	firstname: { type: String, minlength: 1, maxlength: 50, required: true },
	lastname: { type: String, minlength: 1, maxlength: 50, required: true },
	email: { type: String, required: false, unique: true },
	password: { type: String, required: true },
	id: { type: String, required: true },
});

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
