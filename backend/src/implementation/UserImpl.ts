import { UserModel } from "../models/User";

export const findUserByContact = async (contact: number) => {
	let foundOne = await UserModel.findOne({ contact });
	if (foundOne) return true;
	return false;
};

export const findUserByEmail = async (email: string) => {
	let foundOne = await UserModel.findOne({ email });
	if (foundOne) return true;
	return false;
};

export const getSaltByContact = async (contact: number) => {
	let foundOne = await UserModel.findOne({ contact });
	if (foundOne) return foundOne.authentication?.salt;
	return null;
};

export const getSaltByEmail = async (email: number) => {
	let foundOne = await UserModel.findOne({ email });
	if (foundOne) return foundOne.authentication?.salt;
	return null;
};

export const register = async (user: Record<string, any>) => {
	return await new UserModel(user).save().then((u) => getNormalizedUser(u.toObject()));
};

export const contactLogin = async (contact: string, password: string) => {
	return await UserModel.findOne({ contact, "authentication.password": password }).then((u) => getNormalizedUser(u));
};

export const emailLogin = async (email: string, password: string) => {
	return await UserModel.findOne({ email, "authentication.password": password }).then((u) => getNormalizedUser(u));
};

const getNormalizedUser = (u: any) => {
	let { firstName, lastName, dateOfBirth, username, contact, email, _id, createdAt } = u!;

	return {
		name: `${firstName} ${lastName}`,
		birth_date: dateOfBirth,
		username,
		contact,
		email,
		id: _id,
		createdAt,
	};
};
