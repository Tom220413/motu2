import React, { useState } from 'react';
import { fetchUsers, createUser, updateUser, deleteUser } from '../apis/apis';

function SignupForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (event: any) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        // ユーザー登録処理をここに実装する
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                名前:
                <input type="text" value={name} onChange={handleNameChange} />
            </label>
            <label>
                メールアドレス:
                <input type="email" value={email} onChange={handleEmailChange} />
            </label>
            <label>
                パスワード:
                <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
            <button type="submit">登録</button>
        </form>
    );
}

export default SignupForm;
