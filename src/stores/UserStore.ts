import { makeAutoObservable } from 'mobx';
import { HydrationStore, IHydrationStore } from './HydrationType';
import User from '@models/User';
import { login, myProfile } from '@apis/auth';
import { deserializationStore } from '@utils/hydrationUtil';
import { LoginRequest } from '@apis/authAPI';

export default class UserStore implements IHydrationStore {
	private _profile?: User;
	private _test = '';
	constructor() {
		makeAutoObservable(this);
	}
	setTest(test: string) {
		this._test = test;
	}
	async fetchProfile() {
		const res = await myProfile();
		if (!res.data) return;
		const { user } = res.data;
		this._profile = user;
	}
	async authLogin({ email, password }: LoginRequest) {
		const result = await login({
			email,
			password,
		});
		if (!result) return;

		this._profile = result.user;
	}
	get profile() {
		return this._profile;
	}
	get test() {
		return this._test;
	}
	hydrate(hydrateData?: HydrationStore<UserStore>) {
		if (!hydrateData) return;
		const deserialized = deserializationStore<UserStore>(this, hydrateData);

		if (deserialized.profile) {
			this._profile = deserialized.profile;
		}
		if (deserialized.test) {
			this._test = deserialized.test;
		}
	}
}
