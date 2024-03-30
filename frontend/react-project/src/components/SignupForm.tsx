import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase'; // Firebase設定ファイルのパスを適切に設定してください

function SignupForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // エラーメッセージの状態

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(''); // エラーメッセージをリセット
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("登録成功:", userCredential.user);
            // ここで追加のユーザー情報を設定したり、ユーザーをダッシュボードなどにリダイレクトすることができます。
        } catch (error: any) {
            setError(error.message); // エラーメッセージを設定
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    名前:
                    <input type="text" value={name} onChange={handleNameChange} />
                </label>
            </div>
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
            <button type="submit">登録</button>
        </form>
    );
}

export default SignupForm;
