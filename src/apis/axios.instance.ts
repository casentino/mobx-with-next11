import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: process.env.DEV_SERVER_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

export function axiosAuthrization(token: string) {
	axiosInstance.defaults.headers.authorization = `Bearer ${token}`;
}
