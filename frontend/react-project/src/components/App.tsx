import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Redirect, Route, RouteProps, Switch } from 'react-router-dom';

import { Map } from "./Map";
import SearchHeader from './SearchHeader';
import "./styles.css";
import { Search } from "./Search";
import { Tab, Review, AuthUser } from "../types/types";
import { AuthUserProvider, useAuthUser } from './AuthUserContext';
import LogoutPage from './LogoutPage';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import ProfilePage from './ProfilePage';


function App() {
    const [activeTab, setActiveTab] = useState(0);

    const top = () => {
        return (
            < HomePage />
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
            content: top(),
        },
        {
            id: 2,
            label: "ランキング",
            content: top(),
        },
        {
            id: 3,
            label: "レビュー",
            content: top(),
        },
        {
            id: 4,
            label: "マイページ",
            content: top(),
        },
    ];
    // const UnAuthRoute: React.FC<RouteProps> = ({ ...props }) => {
    //     const authUser = useAuthUser()
    //     const isAuthenticated = authUser != null
    //     const { from = "/" } = useLocation<{ from: string }>().state ?? {}

    //     if (isAuthenticated) {
    //         console.log(`ログイン済みのユーザーは${props.path}へはアクセスできません`)
    //         return <Redirect to={from} />
    //     } else {
    //         return <Route {...props} />
    //     }
    // }

    // const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
    //     const authUser = useAuthUser();
    //     const isAuthenticated = authUser != null;

    //     if (isAuthenticated) {
    //         return <Route {...rest}>{children}</Route>;
    //     } else {
    //         console.log(`ログインしていないユーザーは${rest.path}へはアクセスできません`);
    //         return <Redirect to="/login" />;
    //     }
    // };

    return (
        <>
            <div className="maincontainer">
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
                {/* <TodoTitle title="レビューを追加" as="h1" /> */}
                {/* <TodoAdd buttonText="+ 投稿" inputEl={inputEl} handleAddTodoListItem={handleAddTodoListItem} /> */}
                {/* <Map /> */}
                {/* <AuthUserProvider>
                <Router>
                    <Switch>
                        <UnAuthRoute exact path="/login" component={LoginPage} />
                        <UnAuthRoute exact path="/logout" component={LogoutPage} />
                        <PrivateRoute exact path="/" component={HomePage} />
                        <PrivateRoute exact path="/profile/:userId" component={ProfilePage} />
                        <Redirect to="/" />
                    </Switch>
                </Router>
            </AuthUserProvider> */}
            </div>
        </>
    );
}

export default App;