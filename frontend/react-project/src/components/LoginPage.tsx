import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './Firebase'; // Firebase設定ファイルのパスを適切に設定してください
import { useNavigate } from 'react-router-dom'; // ログイン後のリダイレクト用
import { AuthUser } from "../types/types";

interface LoginPageProps {
    setAuthUser: (user: AuthUser | null) => void;// ここでは簡単のため any 型を使用
}

function LoginPage({ setAuthUser }: LoginPageProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("ログイン成功");
            setAuthUser(userCredential.user); // ログインしたユーザー情報で状態を更新
            navigate('/dashboard');
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    メールアドレス:
                    <input type="email" value={email} onChange={handleEmailChange} />
                </label>
            </div>
            <div>
                <label>
                    パスワード:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">ログイン</button>
        </form>
    );
}

export default LoginPage;
