import { makeAutoObservable } from 'mobx';
import Todo from '../models/Todo';

export default class TodoStore {
	private _todoList: Todo[] = [];

	constructor() {
		makeAutoObservable(this);
	}
	addTodo(todo: Todo) {
		this._todoList.push(todo);
	}

	removeTodo(id: number) {
		this._todoList = this._todoList.filter((todo) => todo.id !== id);
	}

	get todoList() {
		return this._todoList;
	}
	hydrate(hydrateData?: TodoStore) {
		if (!hydrateData) return;

		if (hydrateData.todoList) {
			this._todoList = hydrateData.todoList;
		}
	}
}
