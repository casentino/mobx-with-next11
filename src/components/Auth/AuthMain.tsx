import React from 'react';
import useLocateCompObject from './useLocateCompObject';

interface AuthMainProps {}
export default function AuthMain({ children }: React.PropsWithChildren<AuthMainProps>) {
	const { AuthButton, AuthTitle, AuthChildrens } = useLocateCompObject(children);
	return (
		<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
			{AuthTitle && <div>{AuthTitle}</div>}
			{AuthChildrens}
			{AuthButton && <div>{AuthButton}</div>}
		</div>
	);
}
