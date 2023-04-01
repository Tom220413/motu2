import axios from "axios";
import { Todo } from "../types/Todo";

const API_BASE_URL = "http://localhost:8080/db/";

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
