import axios from "axios";
import { Todo } from "../types/Todo";

const API_BASE_URL = "http://localhost:8080/db/";

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
});

// 全てのTODOリストを取得する
export const fetchAllTodos = async (): Promise<Todo[]> => {
    const response = await axios.get<Todo[]>(API_BASE_URL + "list");
    return response.data;
};

// 1件のTODOを追加する
export const createTodo = async (todo: Todo): Promise<Todo> => {
    const response = await axios.post<Todo>(API_BASE_URL + "post", todo);
    return response.data;
};

// 1件のTODOを削除する
export const deleteTodo = async (id: string): Promise<void> => {
    await axios.delete(API_BASE_URL + `delete/${id}`);
};

// 1件のTODOを更新する
export const updateTodoData = async (id: string, todo: Todo): Promise<void> => {
    await axios.put(API_BASE_URL + `update/${id}`, todo);
};


export const fetchUsers = () => {
    return apiClient.get('/users');
}

export const createUser = (data) => {
    return apiClient.post('/users', data);
}

export const updateUser = (id, data) => {
    return apiClient.put(`/users/${id}`, data);
}

export const deleteUser = (id) => {
    return apiClient.delete(`/users/${id}`);
}