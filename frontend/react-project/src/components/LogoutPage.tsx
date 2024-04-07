// LogoutPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from './Firebase'; // Firebase設定ファイルのパスを適切に設定してください
import { AuthUser } from "../types/types";

interface LogoutPageProps {
    setAuthUser: (user: AuthUser | null) => void;
}

const LogoutPage: React.FC<LogoutPageProps> = ({ setAuthUser }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth); // Firebase authを使ってログアウト
            setAuthUser(null); // ユーザー状態をnullに更新
            navigate('/'); // ホームページにリダイレクト
        } catch (error: any) {
            console.error("ログアウトエラー", error.message);
        }
    };

    return (
        <div>
            <button onClick={handleLogout}>ログアウト</button>
        </div>
    );
};

export default LogoutPage;
