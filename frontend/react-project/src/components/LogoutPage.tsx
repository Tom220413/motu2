import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from './firebase'; // Firebase設定ファイルのパスを適切に設定してください
import { useNavigate } from 'react-router-dom'; // ログアウト後のリダイレクト用

function LogoutPage() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        console.log("ログアウトしました");
        navigate('/login'); // ログアウト後にリダイレクト
    };

    return (
        <div>
            <button onClick={handleLogout}>ログアウト</button>
        </div>
    );
}

export default LogoutPage;
