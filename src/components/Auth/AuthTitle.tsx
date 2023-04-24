import Typography from '../common/Typography';

interface AuthTitleProps {}

export default function AuthTitle({ children }: React.PropsWithChildren<AuthTitleProps>) {
	return <Typography variant="h2">{children}</Typography>;
}
