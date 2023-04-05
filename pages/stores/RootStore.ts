import { enableStaticRendering } from 'mobx-react-lite';
import { getIsServer } from '../utils/common';
import { HydrateStoreData } from './HydrationType';
import TodoStore from './TodoStore';

enableStaticRendering(getIsServer());

export class RootStore {
  todoStore: TodoStore;

  constructor() {
    this.todoStore = new TodoStore();
  }
  hydrate(data?: HydrateStoreData) {
    if (!data) return this;
    if (data.todoStore) {
      this.todoStore.hydrate(data.todoStore);
    }
  }
}
