import Input from '../common/Input';
import Label from '../common/Label';
import Typography from '../common/Typography';

interface AuthPasswordProps {
	onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function AuthPassword({ onChange }: React.PropsWithChildren<AuthPasswordProps>) {
	const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange instanceof Function) {
			onChange(e.target.value, e);
		}
	};
	return (
		<>
			<Label htmlFor="password">
				<Typography variant="div" textColor="gray-500" fontWeight="extralight">
					Password
				</Typography>
			</Label>
			<Input type="password" name="password" id="password" onChange={handlePassword} />
		</>
	);
}
