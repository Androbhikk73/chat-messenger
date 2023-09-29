import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { authentication, random } from "../helpers/helper";
import { findUserByContact, contactLogin, register, getSaltByContact, getSaltByEmail, findUserByEmail, emailLogin } from "../implementation/UserImpl";
import { TokenizedUser, UserDetails } from "../policies/UserInterface";

const { app_secret_key } = process.env;

const createJwtToken = (user: any) => {
	return jwt.sign(user, app_secret_key!, {
		algorithm: "HS256",
		expiresIn: "1h",
	});
};

export const userRegister = async (req: Request, res: Response) => {
	try {
		let { first_name, last_name, birth_date, username, contact, email, profile_pic, password } = req.body;

		if (first_name === "") {
			res.status(400).json({
				message: "FIRSTNAME_REQUIRED",
			});
		} else if (last_name === "") {
			res.status(400).json({
				message: "LASTNAME_REQUIRED",
			});
		} else if (birth_date === "") {
			res.status(400).json({
				message: "BIRTH_DATE_REQUIRED",
			});
		} else if (username === "") {
			res.status(400).json({
				message: "USERNAME_REQUIRED",
			});
		} else if (contact === "") {
			res.status(400).json({
				message: "CONTACT_REQUIRED",
			});
		} else if (email === "") {
			res.status(400).json({
				message: "EMAIL_REQUIRED",
			});
		} else if (password === "") {
			res.status(400).json({
				message: "PASSWORD_REQUIRED",
			});
		} else {
			if (await findUserByContact(contact)) {
				res.status(400).json({
					message: "USER_CONTACT_EXISTS",
				});
			} else {
				let salt = random();
				let userDetail: UserDetails = {
					firstName: first_name,
					lastName: last_name,
					dateOfBirth: birth_date,
					username: username,
					contact,
					email,
					profilePic: profile_pic,
					authentication: {
						salt,
						password: authentication(salt, password),
					},
				};
				let user = await register(userDetail);
				let token = createJwtToken(user);

				res.status(200).json({ message: token });
			}
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: err,
		});
	}
};

export const userLogin = async (req: Request, res: Response) => {
	try {
		let { contact, email, password } = req.body;
		let user: TokenizedUser | any = null;

		if (!password) {
			res.status(400).json({
				message: "CREDENTIAL_REQUIRED",
			});
		} else if (!contact || !email) {
			res.status(400).json({
				message: "CREDENTIAL_REQUIRED",
			});
		} else if (contact && password) {
			if (await findUserByContact(contact)) {
				let salt = (await getSaltByContact(contact)) as string;
				user = await contactLogin(contact, authentication(salt, password));
			} else {
				console.log(contact, password);

				res.status(403).json({
					message: "CREDENTIAL_MISMATCHED",
				});
			}
		} else if (email && password) {
			if (await findUserByEmail(email)) {
				let salt = (await getSaltByEmail(email)) as string;
				user = await emailLogin(email, authentication(salt, password));
			} else {
				res.status(403).json({
					message: "CREDENTIALE_MISMATCHED",
				});
			}
		}

		if (user) {
			let token = createJwtToken(user);

			res.status(200).json({ message: token });
		} else {
			res.status(417).json({
				message: "EXPECTATION_FAILED",
			});
		}
	} catch (err) {
		res.status(500).json({
			message: err,
		});
	}
};
