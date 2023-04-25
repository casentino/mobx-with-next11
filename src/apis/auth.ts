import { LoginRequest, LoginResponse, ProfileResponse, SignUpRequest, SignUpResponse } from './authAPI';
import { axiosAuthrization, axiosInstance } from './axios.instance';

export async function login({ email, password }: LoginRequest) {
	const response = await axiosInstance.post<LoginResponse>('/auth/signin', {
		email,
		password,
	});
	const { user, token } = response.data;
	axiosAuthrization(token);
	localStorage.setItem('access-token', token);
	return { user };
}

export function signup(signupReq: SignUpRequest) {
	return axiosInstance.post<SignUpResponse>('/auth/register', {
		...signupReq,
	});
}

export function myProfile() {
	return axiosInstance.get<ProfileResponse>('/auth');
}
