import User from '@models/User';

type UserResponse = {
	user: User;
};

export type LoginRequest = {
	email: string;
	password: string;
};

export type LoginResponse = UserResponse & {
	token: string;
};
export type SignUpRequest = {
	email: string;
	name: string;
	password: string;
};

export type SignUpResponse = UserResponse;

export type ProfileResponse = UserResponse;
