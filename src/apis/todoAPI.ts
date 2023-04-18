import Todo from 'models/Todo';

export type TodosResponse = {
	todos: Todo[];
};

export type TodoResponse = {
	todo: Todo[];
};

export type CreateTodoRequest = {
	title: string;
	content: string;
};
