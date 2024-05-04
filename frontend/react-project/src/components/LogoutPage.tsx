// LogoutPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth'; // useAuth フックをインポート
import { AuthUser } from "../types/types";


interface LogoutPageProps {
    setAuthUser: (user: AuthUser | null) => void;
}

const LogoutPage: React.FC<LogoutPageProps> = ({ setAuthUser }) => {
    const navigate = useNavigate();
    const { signOut } = useAuth(); // useAuth フックから signOut 関数を取得

    const handleLogout = async () => {
        try {
            await signOut(); // Cognitoを使ってログアウト
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
