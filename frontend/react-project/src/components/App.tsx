import React, { useRef } from "react";

import { useTodo } from "./useTodo";
import { Todo } from "../types/Todo";
import { TodoAdd } from "./TodoAdd";
import { TodoList } from "./TodoList";
import { TodoTitle } from "./TodoTitle";
import { Map } from "./Map";

function App() {
    const { todoList, toggleTodoListItemStatus, addTodoListItem, deleteTodoListItem } = useTodo();
    const inputEl = useRef<HTMLTextAreaElement>(null);

    const handleAddTodoListItem = () => {
        if (inputEl.current?.value === "") {
            return;
        }
        addTodoListItem(inputEl.current!.value);
        inputEl.current!.value = "";
    };

    const incompletedList = todoList.filter((todo: Todo) => !todo.done);
    const completedList = todoList.filter((todo: Todo) => todo.done);

    const renderTodoList = (title: string, list: Todo[]) => {
        return (
            <TodoList
                todoList={list}
                toggleTodoListItemStatus={toggleTodoListItemStatus}
                deleteTodoListItem={deleteTodoListItem}
                title={title}
                as="h2"
            />
        );
    };

    return (
        <>
            <TodoTitle title="TODO進捗管理" as="h1" />
            <TodoAdd buttonText="+ TODOを追加" inputEl={inputEl} handleAddTodoListItem={handleAddTodoListItem} />
            {renderTodoList("未完了TODOリスト", incompletedList)}
            {renderTodoList("完了TODOリスト", completedList)}
            <Map />
        </>
    );
}

export default App;