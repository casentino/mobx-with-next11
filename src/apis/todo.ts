import Todo from '@models/Todo';
import { axiosInstance } from './axios.instance';
import { CreateTodoRequest, TodosResponse, TodoResponse } from './todoAPI';

export function getTodos() {
	return axiosInstance.get<TodoResponse>('/todo');
}

export function getTodo(id: string) {
	return axiosInstance.get<TodosResponse>(`/todo/${id}`);
}

export function createTodo({ title, content }: CreateTodoRequest) {
	return axiosInstance.post<TodoResponse>('/todo', {
		title,
		content,
	});
}

export function updateTodo(id: string, todo: Todo) {
	return axiosInstance.put<TodoResponse>(`/todo/${id}`, {
		todo,
	});
}

export function deleteTodo(id: string) {
	return axiosInstance.delete<TodoResponse>(`/todo/${id}`);
}
