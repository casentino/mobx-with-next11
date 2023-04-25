import { DetailedHTMLProps, LabelHTMLAttributes } from 'react';

interface LabelProps extends DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {}

export default function Label({ children, ...props }: React.PropsWithChildren<LabelProps>) {
	return (
		<label className="block text-sm font-medium leading-6 text-gray-900" {...props}>
			{children}
		</label>
	);
}
