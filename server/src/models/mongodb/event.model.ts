import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IEvent extends mongoose.Document {
	title: string;
	description: string;
	startTime: Date;
	endTime: Date;
	createdBy: mongoose.Types.ObjectId;
}

export const EventSchema = new Schema<IEvent>({
	title: { type: String, required: true },
	description: { type: String, required: true },
	startTime: { type: Date, required: true },
	endTime: { type: Date, required: true },
	createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const EventModel = mongoose.model<IEvent>('Event', EventSchema);
export default EventModel;
