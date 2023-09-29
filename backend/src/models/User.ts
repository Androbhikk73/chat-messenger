import { Schema, model } from "mongoose";

const UserSchema = new Schema(
	{
		firstName: {
			type: String,
			require: true,
		},
		lastName: {
			type: String,
			require: true,
		},
		dateOfBirth: {
			type: String,
			require: true,
		},
		username: {
			type: String,
			require: true,
		},
		contact: {
			type: String,
			require: true,
			unique: true,
		},
		email: {
			type: String,
			require: true,
			unique: true,
		},
		profilePic: String,
		authentication: {
			salt: { type: String, require: true },
			password: { type: String, require: true },
		},
	},
	{ timestamps: true }
);

export const UserModel = model("users", UserSchema);
