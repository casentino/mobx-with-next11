import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export default function Input({ ...inputProps }: React.PropsWithChildren<InputProps>) {
	return (
		<input
			className="block w-full rounded-md border-0 py-1.5 indent-3 text-gray-500 shadow-sm ring-1 hover:ring-indigo-400 ring-inset ring-gray-300 focus:outline-none focus:ring-indigo-600 placeholder:text-gray-400 sm:text-sm sm:leading-6"
			{...inputProps}
		/>
	);
}
