import AuthButton from './AuthButton';
import AuthEmail from './AuthEmail';
import AuthMain from './AuthMain';
import AuthPassword from './AuthPassword';
import AuthTitle from './AuthTitle';

const Auth = Object.assign(AuthMain, {
	Email: AuthEmail,
	Password: AuthPassword,
	Title: AuthTitle,
	Button: AuthButton,
});
export default Auth;
