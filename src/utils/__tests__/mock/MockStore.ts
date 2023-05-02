import { ObservableMap, ObservableSet, makeAutoObservable, observable } from 'mobx';
import Todo from '../../../models/Todo';
import { HydrationStore, IHydrationStore } from '../../../stores/HydrationType';
import { deserializationStore } from '../../hydrationUtil';

export default class MockStore implements IHydrationStore {
	private _todoMap: ObservableMap<number, Todo> = observable.map<number, Todo>();
	private _todoIdSet?: ObservableSet<number>;
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
		if (!this._todoMap) {
			this._todoMap = observable.map<number, Todo>();
		}
		this._todoMap.set(id, todo);
	}
	setTodoIdSet(id: number) {
		if (!this._todoIdSet) {
			this._todoIdSet = observable.set<number>();
		}
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
	setCurrentTodoChecked(checked: boolean) {
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
	hydrate(data?: HydrationStore<MockStore>): void {
		if (!data) return;

		const des = deserializationStore<MockStore>(this, data);
		if (des.todo) {
			this._todo = des.todo;
		}
		if (des.todoMap) {
			this._todoMap = des.todoMap;
		}
	}
}
