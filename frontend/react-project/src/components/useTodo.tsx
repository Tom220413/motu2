import React, { useState, useEffect } from "react";
import { ulid } from "ulid";

import * as todoData from "../apis/todos";
import { Todo } from "../types/Todo";

export const useTodo = () => {
    const [todoList, setTodoList] = useState<Todo[]>([]);

    useEffect(() => {
        todoData.fetchAllTodos().then((todos) => {
            // リストを反転してからセットする
            setTodoList([...todos].reverse());
        });
    }, []);

    const toggleTodoListItemStatus = (id: string, done: boolean) => {
        // クリックされたアイテムの更新フラグを反転させる
        const newTodoList = todoList.map((item) =>
            item.id === id ? { ...item, done: !done } : item
        );
        setTodoList(newTodoList);

        // サーバーに更新API呼ぶ
        todoData.updateTodoData(id, { ...newTodoList.find((item) => item.id === id)! }).catch(() => {
            // 失敗したら元に戻す
            setTodoList(todoList);
        });

    };

    const addTodoListItem = (todoContent: string) => {
        const newTodoItem: Todo = { id: ulid(), content: todoContent, done: false };

        // サーバーに追加APIを呼ぶ
        todoData
            .createTodo(newTodoItem)
            .then((addedTodo) => {
                setTodoList([addedTodo, ...todoList]);
            })
            .catch(() => {
                // 失敗したら元に戻す
                setTodoList(todoList);
            });
    };

    const deleteTodoListItem = (id: string) => {
        // クリックされたアイテムを除いた新しい配列を作成する
        const newTodoList = todoList.filter((item) => item.id !== id);
        setTodoList(newTodoList);

        // サーバーに削除APIを呼ぶ
        todoData.deleteTodo(id).catch(() => {
            // 失敗したら元に戻す
            setTodoList(todoList);
        });
    };

    return { todoList, toggleTodoListItemStatus, addTodoListItem, deleteTodoListItem };
};
