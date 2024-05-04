import React, { useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { useNavigate } from 'react-router-dom';  // useNavigate フックをインポート
import './signupform.css'; // CSSファイルのインポート

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const { signUp } = useAuth();

    const navigate = useNavigate(); // useNavigate フックを使用して navigate 関数を取得

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const res = await signUp(username, password, email);
            console.log(res);
            alert("Signup successful!");
            navigate('/'); // サインアップ成功後、ホームページまたは適切なページに遷移
        } catch (error) {
            alert(`Signup failed: ${error.message}`);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSignup}>
                <label className="form-label">
                    ユーザー名:
                    <input className="form-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label className="form-label">
                    パスワード:
                    <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label className="form-label">
                    メールアドレス:
                    <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <button className="form-button" type="submit">アカウント登録</button>
                <label className="form-label" />
                <button className="back-button" onClick={() => navigate('/login')} type="button">ログイン画面へ戻る</button>
            </form>
        </div>
    );
};

export default SignupForm;
