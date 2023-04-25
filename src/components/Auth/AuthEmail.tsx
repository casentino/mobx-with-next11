import Input from '../common/Input';
import Label from '../common/Label';
import Typography from '../common/Typography';

interface AuthEmailProps {
	onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const AuthEmailType = (<AuthEmail />).type;
export default function AuthEmail({ onChange }: React.PropsWithChildren<AuthEmailProps>) {
	function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
		if (onChange instanceof Function) {
			onChange(e.target.value, e);
		}
	}
	return (
		<>
			<Label htmlFor="email">
				<Typography variant="div" textColor="gray-500" fontWeight="extralight">
					Email
				</Typography>
			</Label>
			<Input type="text" name="email" id="email" onChange={handleEmail} />
		</>
	);
}
