import { enableStaticRendering } from 'mobx-react-lite';
import { getIsServer } from '../utils/common';
import TodoStore from './TodoStore';

enableStaticRendering(getIsServer());

export class RootStore {
	todoStore: TodoStore;

	constructor() {
		this.todoStore = new TodoStore();
	}
	hydrate(data?: RootStore) {
		if (!data) return;
		if (data.todoStore !== undefined) {
			this.todoStore.hydrate(data.todoStore);
		}
	}
}
