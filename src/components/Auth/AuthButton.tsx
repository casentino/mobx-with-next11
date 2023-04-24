interface AuthButtonProps {
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function AuthButton({ children, onClick }: React.PropsWithChildren<AuthButtonProps>) {
	return (
		<button
			type="button"
			className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500  focus:outline-none focus-visible:outline-none"
			onClick={onClick}
		>
			{children}
		</button>
	);
}
