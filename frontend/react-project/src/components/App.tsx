import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Route, RouteProps, Routes, BrowserRouter } from 'react-router-dom';

import { Map } from "./parts/map/Map";
import SearchHeader from './parts/search/SearchHeader';
import "./styles.css";
import { Search } from "./parts/search/Search";
import { Tab, Review, AuthUser } from "../types/types";
import { AuthUserProvider, useAuthUser } from './AuthUserContext';
import LogoutPage from './LogoutPage';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import { Store } from './page/store/Store';
import Ranking from "./page/ranking/Ranking";
import Mypage from "./page/mypage/Mypage";


function App() {
    const [activeTab, setActiveTab] = useState(0);
    const [authUser, setAuthUser] = useState<AuthUser | null>(null);
    const tabs: Tab[] = [
        {
            id: 0,
            label: "トップ",
            content: < HomePage />,
        },
        {
            id: 1,
            label: "検索",
            content: <Search />,
        },
        {
            id: 2,
            label: "ランキング",
            content: <Ranking />,
        },

    ];
    if (authUser) {
        tabs.push(
            {
                id: 3,
            label: "マイページ",
            content: < Mypage />,
            }
        )
    }
       
    return (
        <>
            <Router>
                <div className="maincontainer">
                    <SearchHeader />
                    <Routes>
                        <Route path="/" element={
                            <>
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
                            </>
                        } />
                        <Route path="/store/:id" element={<Store />} />
                        <Route path="/login" element={<LoginPage setAuthUser={setAuthUser} />} />
                        <Route path="/logout" element={<LogoutPage setAuthUser={setAuthUser} />} />
                        <Route path="/logout" element={<LogoutPage setAuthUser={setAuthUser} />} />
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;