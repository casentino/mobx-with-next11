import { ObservableMap, ObservableSet, makeAutoObservable, observable } from 'mobx';
import Todo from '../../../models/Todo';
import { HydrationStore, IHydrationStore } from '../../../stores/HydrationType';

export default class MockStore implements IHydrationStore {
	private _todoMap: ObservableMap<number, Todo> = observable.map<number, Todo>();
	private _todoIdSet: ObservableSet<number> = observable.set<number>();
	private _list: Todo[] = [];
	private _todo?: Todo;
	private _currentTodoName?: string;
	private _currentTodoId?: number;
	private _currentTodoChecked?: boolean;
	constructor() {
		makeAutoObservable(this);
	}

	setTodoMap(todo: Todo) {
		const { id } = todo;
		this._todoMap.set(id, todo);
	}
	setTodoIdSet(id: number) {
		this._todoIdSet.add(id);
	}
	addTodo(todo: Todo) {
		this._list.push(todo);
	}
	setTodo(todo: Todo) {
		this._todo = todo;
	}
	setCurrentTodoName(title: string) {
		this._currentTodoName = title;
	}
	setCurrentTodoId(id: number) {
		this._currentTodoId = id;
	}
	setCurrentTodoCehcked(checked: boolean) {
		this._currentTodoChecked = checked;
	}

	get todoMap() {
		return this._todoMap;
	}
	get todoIdSet() {
		return this._todoIdSet;
	}
	get list() {
		return this._list;
	}
	get todo() {
		return this._todo;
	}
	get currentTodoName() {
		return this._currentTodoName;
	}
	get currentTodoId() {
		return this._currentTodoId;
	}
	get currentTodoChecked() {
		return this._currentTodoChecked;
	}
	hydrate(data?: HydrationStore<MockStore>): void {}
}
