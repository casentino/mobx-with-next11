import { COOKIE_REFRESH_SESSION, COOKIE_SESSION_ID } from '@config/config';
import { useCookies } from 'react-cookie';
import { CookieSetOptions } from 'universal-cookie';

type AuthCookies = typeof COOKIE_SESSION_ID | typeof COOKIE_REFRESH_SESSION;
type CookieModel = {
	[K in AuthCookies]: string;
};
type UseAuthCookieReturnType = [
	(name: AuthCookies) => string,
	(name: AuthCookies, token: string, expired?: Date) => void,
	(name: AuthCookies, options?: CookieSetOptions | undefined) => void
];
export function useAuthCookie(): UseAuthCookieReturnType {
	const [cookies, setCookie, removeCookie] = useCookies<AuthCookies, CookieModel>([
		COOKIE_SESSION_ID,
		COOKIE_REFRESH_SESSION,
	]);
	const getCookies = (name: AuthCookies) => cookies[name];

	const setCookies = (name: AuthCookies, token: string) => {
		setCookie(name, token, {
			path: '/',
			domain: 'localhost',
		});
	};

	return [getCookies, setCookies, removeCookie];
}
