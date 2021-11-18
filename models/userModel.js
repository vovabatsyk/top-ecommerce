import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			default: 'user',
		},
		root: {
			type: Boolean,
			default: false,
		},
		avatar: {
			type: String,
			default:
				'https://res.cloudinary.com/dwzir5w6o/image/upload/v1637075103/fruits/pngtree-mens-default-avatar-png-image_2813163_dqk20t.jpg',
		},
	},
	{ timestamps: true },
)

let DataSet = mongoose.models.user || mongoose.model('user', userSchema)

export default DataSet
