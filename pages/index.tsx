import React from 'react';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import { useRootStore } from '@stores/RootStoreProvider';
import { useAuthCookie } from '@hooks/useAuthCookie';
import { COOKIE_SESSION_ID } from '@config/config';
import TextField from 'src/components/common/Input';

function Home(props: any) {
	const { authStore, userStore } = useRootStore();
	const [_, setCookie] = useAuthCookie();
	const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		authStore.setEmail(e.target.value);
	};
	const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		authStore.setPassword(e.target.value);
	};
	const handleLogin = async () => {
		const { email, password } = authStore;
		await userStore.authLogin({ email, password });
		setCookie(COOKIE_SESSION_ID, localStorage.getItem('access-token') || '');
	};
	return (
		<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
			<TextField />
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<Image
					className="mx-auto h-10 w-auto"
					src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
					alt="Your Company"
				/>
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Sign in to your account
				</h2>
			</div>
			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<p className="mt-10 text-center text-sm text-gray-500">
					Not a member?
					<a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
						Start a 14 day free trial
					</a>
				</p>
			</div>
		</div>
	);
}

// export const getStaticProps: GetStaticProps = (ctx: GetStaticPathsContext): GetStaticPropsResult => {

// };
export default observer(Home);
