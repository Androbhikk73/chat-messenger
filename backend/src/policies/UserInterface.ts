export interface UserDetails {
	firstName: string;
	lastName: string;
	dateOfBirth: string;
	username: string;
	contact: number;
	email: string;
	profilePic?: string;
	authentication: {
		salt: string;
		password: string;
	};
}

export interface TokenizedUser {
	name: string;
	birth_date: string;
	username: string;
	contact: "7980566783";
	email: "kk.developer.73@gmail.com";
	id: string;
	createdAt: string;
}
