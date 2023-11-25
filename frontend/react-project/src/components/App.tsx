import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Redirect, Route, RouteProps, Switch, BrowserRouter } from 'react-router-dom';

import { Map } from "./Map";
import SearchHeader from './SearchHeader';
import "./styles.css";
import { Search } from "./Search";
import { Tab, Review, AuthUser } from "../types/types";
import { AuthUserProvider, useAuthUser } from './AuthUserContext';
import LogoutPage from './LogoutPage';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import { Store } from './Store';
import Ranking from "./Ranking";
import Mypage from "./Mypage";


function App() {
    const [activeTab, setActiveTab] = useState(0);
    const search = () => {
        return (
            < Search />
        )
    }
    const ranking = () => {
        return (
            < Ranking />
        )
    }

    const top = () => {
        return (
            < HomePage />
        )
    }
    const mypage = () => {
        return (
            < Mypage />
        )
    }
    const tabs: Tab[] = [
        {
            id: 0,
            label: "トップ",
            content: top(),
        },
        {
            id: 1,
            label: "検索",
            content: search(),
        },
        {
            id: 2,
            label: "ランキング",
            content: ranking(),
        },
        {
            id: 3,
            label: "マイページ",
            content: mypage(),
        },
    ];
    return (
        <>
            <Router>
                <div className="maincontainer">
                    <SearchHeader />
                    <Switch>
                        <Route exact path="/">
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
                        </Route>
                        <Route path="/store/:id" component={Store} />
                    </Switch>
                </div>
            </Router>
        </>
    );
}

export default App;