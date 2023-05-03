import { enableStaticRendering } from 'mobx-react-lite';
import { getIsServer } from '../utils/common';
import { HydrateStoreData } from './HydrationType';
import TodoStore from './TodoStore';
import AuthStore from './AuthStore';
import UserStore from './UserStore';

enableStaticRendering(getIsServer());

export class RootStore {
	todoStore: TodoStore;
	authStore: AuthStore;
	userStore: UserStore;
	constructor() {
		this.todoStore = new TodoStore();
		this.authStore = new AuthStore();
		this.userStore = new UserStore();
	}
	hydrate(data?: HydrateStoreData) {
		if (!data) return this;

		if (data.todoStore) {
			this.todoStore.hydrate(data.todoStore);
		}
		if (data.userStore) {
			this.userStore.hydrate(data.userStore);
		}
	}
}
