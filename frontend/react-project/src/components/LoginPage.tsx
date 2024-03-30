import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase'; // Firebase設定ファイルのパスを適切に設定してください
import { useNavigate } from 'react-router-dom'; // ログイン後のリダイレクト用

function LoginPage() {
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
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("ログイン成功");
            navigate('/dashboard'); // ログイン成功後にリダイレクト
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
