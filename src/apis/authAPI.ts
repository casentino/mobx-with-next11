import User from 'models/User';

export type LoginRequest = {
	email: string;
	password: string;
};

export type LoginResponse = {
	user: User;
	token: string;
};
export type SignUpRequest = {
	email: string;
	name: string;
	password: string;
};

export type SignUpResponse = {
	user: User;
};
