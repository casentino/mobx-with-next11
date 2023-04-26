import { login, signup } from '@apis/auth';
import { makeAutoObservable } from 'mobx';

export default class AuthStore {
	private _email = '';
	private _name = '';
	private _password = '';
	private _passwordConfirm = '';

	constructor() {
		makeAutoObservable(this);
	}

	setEmail(email: string) {
		this._email = email;
	}
	setPassword(password: string) {
		this._password = password;
	}

	setPasswordConfirm(passwordConfirm: string) {
		this._passwordConfirm = passwordConfirm;
	}
	setName(name: string) {
		this._name = name;
	}
	async register() {
		await signup({
			email: this._email,
			password: this._password,
			name: this._name,
		});
	}

	get email() {
		return this._email;
	}
	get password() {
		return this._password;
	}
	get passwordConfirm() {
		return this._passwordConfirm;
	}
	get name() {
		return this._name;
	}
}
