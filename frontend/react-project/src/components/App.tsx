import React, { useRef, useState } from "react";

import { useTodo } from "./useTodo";
import { Todo } from "../types/Todo";
import { TodoAdd } from "./TodoAdd";
import { TodoList } from "./TodoList";
import { TodoTitle } from "./TodoTitle";
import { Map } from "./Map";
import SearchHeader from './SearchHeader';
import "./styles.css";
import ReviewSlider from './ReviewSlider';
import { Search } from "./Search";

type Tab = {
    id: number;
    label: string;
    content: JSX.Element;
}
type Review = {
    id: number;
    author: string;
    text: string;
}


function App() {
    const { todoList, toggleTodoListItemStatus, addTodoListItem, deleteTodoListItem } = useTodo();
    const inputEl = useRef<HTMLTextAreaElement>(null);
    const [activeTab, setActiveTab] = useState(0);
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
    const reviews: Review[] = [
        {
            id: 1,
            author: 'John Smith',
            text: 'えええ'
        },
        {
            id: 2,
            author: 'Jane Doe',
            text: 'ううう'
        },
        {
            id: 3,
            author: 'Mike Johnson',
            text: 'いいい'
        },
        {
            id: 4,
            author: 'Alice Williams',
            text:
                'あああ',
        },
        {
            id: 5,
            author: 'Alice Williams',
            text:
                'おおお',
        },

    ]
    // テスト的に値を入れている　本来はdbから値を取ってくる
    const rankings: Review[] = [
        {
            id: 1,
            author: '1位',
            text: 'えええ'
        },
        {
            id: 2,
            author: '2位',
            text: 'ううう'
        },
        {
            id: 3,
            author: '3位',
            text: 'いいい'
        },
        {
            id: 4,
            author: '4位',
            text:
                'あああ',
        },
        {
            id: 5,
            author: '5位',
            text:
                'おおお',
        },

    ]
    const serch = () => {
        return (
            <Search />
        )
    }
    const ranking = (rankings: Review[]) => {
        return (
            <ReviewSlider reviews={rankings || []} />
        )
    }
    const review = (reviews: Review[]) => {
        return (
            <ReviewSlider reviews={reviews || []} />
        )
    }
    const tabs: Tab[] = [
        {
            id: 0,
            label: "トップ",
            content: renderTodoList("未完了TODOリスト", incompletedList),
        },
        {
            id: 1,
            label: "検索",
            content: serch(),
        },
        {
            id: 2,
            label: "ランキング",
            content: ranking(rankings),
        },
        {
            id: 3,
            label: "レビュー",
            content: review(reviews),
        },
        {
            id: 4,
            label: "マイページ",
            content: renderTodoList("完了TODOリスト", completedList),
        },
    ];

    return (
        <>
            <SearchHeader />
            <nav className="tabs">
                {tabs.map((tab) => (
                    <a
                        key={tab.id}
                        className={activeTab === tab.id ? "active" : ""}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </a>
                ))}
            </nav>
            <div className="tab-content">{tabs[activeTab].content}</div>
            <TodoTitle title="レビューを追加" as="h1" />
            <TodoAdd buttonText="+ 投稿" inputEl={inputEl} handleAddTodoListItem={handleAddTodoListItem} />
            {/* <Map /> */}
        </>
    );
}

export default App;