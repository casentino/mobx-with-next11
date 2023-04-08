import { ObservableMap, ObservableSet, isObservable, isObservableMap, isObservableObject, isObservableSet } from 'mobx';
import { deserializationStore, serializationStore } from '../hydrationUtil';
import MockStore from './mock/MockStore';
import todos from './mock/todos';
import { observable } from 'mobx';
import { toJS } from 'mobx';

describe('hydration util tets', () => {
	let store: MockStore;
	beforeEach(() => {
		store = new MockStore();
		const [todo1, ...others] = todos;
		store.setCurrentTodoCehcked(todo1.checked);
		store.setCurrentTodoName(todo1.title);
		store.setCurrentTodoId(todo1.id);
		store.setTodo(todo1);
		others.forEach((todo) => {
			store.setTodoMap(todo);
			store.addTodo(todo);
			store.setTodoIdSet(todo.id);
		});
	});
	it('serialize test', () => {
		const serializedStore = serializationStore(store);
		Object.entries(serializedStore).forEach(([key, value]) => {
			expect(isObservable(value)).toBeFalsy();
		});
	});
	it('deserialize test', () => {
		const serializedStore = serializationStore(store);
		const deserializeedStore = deserializationStore(serializedStore, store);
		Object.entries(deserializeedStore).forEach(([key, value]) => {
			const originValue = store[key as keyof MockStore];
			if (isObservableMap(originValue)) {
				expect(value).toBeInstanceOf(ObservableMap);
			} else if (isObservableSet(originValue)) {
				expect(value).toBeInstanceOf(ObservableSet);
			}
			expect(toJS(value)).toEqual(toJS(originValue));
		});
	});
});
