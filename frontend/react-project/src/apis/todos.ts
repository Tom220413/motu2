import axios from "axios";
import { Todo } from "../types/Todo";

const todoDataUrl = "https://localhost:3100/todos";

//全todoリスト取得
export const getAllTodosData = async () => {
    const response = await axios.get(todoDataUrl);
    return response.data;
};

//1件のtodoを追加する
export const addTodoData = async (todo: Todo) => {
    const response = await axios.post(todoDataUrl, todo);
    return response.data;
};

//1件のtodoを削除する
export const removeTodoData = async (id: string) => {
    await axios.delete(`${todoDataUrl}/${id}`);
    return id;
};

//1件のtodoを更新する
export const updateTodoData = async (id: string, todo: Todo) => {
    const response = await axios.put(`${todoDataUrl}/${id}`, todo);
    return response.data;
}
