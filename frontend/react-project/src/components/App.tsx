import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useAuth } from "../hooks/use-auth";
import PrivateRoute from "./PrivateRoute";
import HomePage from './HomePage';
import { Store } from './page/store/Store';
import Ranking from "./page/ranking/Ranking";
import Mypage from "./page/mypage/Mypage";
import { SignIn } from "./LoginPage";
import { Map } from "./parts/map/Map";
import SearchHeader from './parts/search/SearchHeader';
import { Search } from "./parts/search/Search";
import { Tab } from "../types/types";
import "./styles.css";

function App() {
    const auth = useAuth();  // このフックから認証関連の情報とメソッドを取得
    const [activeTab, setActiveTab] = useState(0);

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    const TopPage = () => (
        <div>
            <p>トップページ</p>
            <p>{auth.isAuthenticated ? 'ログイン済' : '未ログイン'}</p>
            {!auth.isAuthenticated && <p><Link to="/signin">ログイン</Link></p>}
        </div>
    );

    const PrivateDashboard = () => (
        <PrivateRoute>
            <div>ようこそ！ {auth.username} さん！</div>
            <button onClick={auth.signOut}>ログアウト</button>
        </PrivateRoute>
    );

    const tabs: Tab[] = [
        {
            id: 0,
            label: "トップ",
            content: <HomePage />,
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
        {
            id: 3,
            label: "マイページ",
            content: auth.isAuthenticated ? <Mypage /> : <TopPage />,
        },
    ];

    return (
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
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/dashboard" element={<PrivateDashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
