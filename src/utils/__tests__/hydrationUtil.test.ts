import { ObservableMap, ObservableSet, isObservable, isObservableMap, isObservableObject, isObservableSet } from 'mobx';
import { deserializationStore, serializationStore } from '../hydrationUtil';
import MockStore from './mock/MockStore';
import todos from './mock/todos';
import { toJS } from 'mobx';

describe('hydration util tets', () => {
	let store: MockStore;
	let jsonStore: Record<string, any> = {};
	beforeEach(() => {
		store = new MockStore();
		const [todo1, ...others] = todos;
		store.setCurrentTodoChecked(todo1.checked);
		store.setCurrentTodoName(todo1.title);
		store.setCurrentTodoId(todo1.id);
		store.setTodo(todo1);
		jsonStore.currentTodoName = todo1.title;
		jsonStore.currentTodoChecked = todo1.checked;
		jsonStore.currentTodoId = todo1.id;
		jsonStore.todo = todo1;
		jsonStore.list = [];
		jsonStore.todoIdSet = new Set();
		jsonStore.todoMap = new Map();
		others.forEach((todo) => {
			store.setTodoMap(todo);
			jsonStore.todoMap.set(todo.id, todo);
			store.addTodo(todo);
			jsonStore.list.push(todo);
			store.setTodoIdSet(todo.id);
			jsonStore.todoIdSet.add(todo.id);
		});
		jsonStore.todoMap = Array.from(jsonStore.todoMap.entries());
		jsonStore.todoIdSet = Array.from(jsonStore.todoIdSet.values());
	});
	it('serialize test', () => {
		const serializedStore = serializationStore(store);
		Object.entries(serializedStore).forEach(([key, value]) => {
			expect(isObservable(value)).toBeFalsy();
			expect(value instanceof Function).toBeFalsy();
		});
		expect(serializedStore).toEqual(jsonStore);
		expect(serializedStore).toStrictEqual(jsonStore);
	});
	it('deserialize test', () => {
		const serializedStore = serializationStore(store);
		const deserializeedStore = deserializationStore(store, serializedStore);
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
	it('deserialize undefined map set test', () => {
		store = new MockStore();
		const [todo1, ...others] = todos;
		store.setCurrentTodoChecked(todo1.checked);
		store.setCurrentTodoName(todo1.title);
		store.setCurrentTodoId(todo1.id);
		store.setTodo(todo1);

		others.forEach((todo) => {
			store.setTodoMap(todo);
			store.addTodo(todo);
			store.setTodoIdSet(todo.id);
		});
		const serializedStore = serializationStore(store);
	});
});
