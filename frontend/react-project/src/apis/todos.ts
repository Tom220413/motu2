import axios from "axios";
import { Todo } from "../types/Todo";

var todoDataUrl = "http://localhost:8080/";

// 全TODOリスト取得
export const getAllTodosData = async () => {
    todoDataUrl += "db/list"
    const response = await axios.get(todoDataUrl);
    return response.data;
};

// 1件のTODOを追加する
export const addTodoData = async (todo: Todo) => {
    var postDataUrl = "http://localhost:8080/db/post";
    const response = await axios.post(postDataUrl, todo);
    return response.data;
};

// 1件のTODOを削除する
export const deleteTodoData = async (id: string) => {
    await axios.delete(`${todoDataUrl}/${id}`);
    return id;
};

// 1件のTODOを更新する
export const updateTodoData = async (id: string, todo: Todo) => {
    const response = await axios.put(`${todoDataUrl}/${id}`, todo);
    return response.data;
};