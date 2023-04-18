import { LoginRequest, LoginResponse, SignUpRequest, SignUpResponse } from './authAPI';
import { axiosInstance } from './axios.instance';

export async function login({ email, password }: LoginRequest) {
	const response = await axiosInstance.post<LoginResponse>('/auth/signin', {
		email,
		password,
	});
	const { user, token } = response.data;
	axiosInstance.defaults.headers.authorization = `Bearer ${token}`;
	return { user };
}

export function signup(signupReq: SignUpRequest) {
	return axiosInstance.post<SignUpResponse>('/auth/register', {
		...signupReq,
	});
}
