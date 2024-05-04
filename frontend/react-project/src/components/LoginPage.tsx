import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AuthenticationDetails,
    CognitoUser
} from "amazon-cognito-identity-js";
import { userPool } from './Congnito'; // Import the user pool configuration from another file
import "./styles.css";

export function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const executeSignIn = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const authenticationDetails = new AuthenticationDetails({
            Username: username,
            Password: password
        });

        const userData = {
            Username: username,
            Pool: userPool
        };

        const cognitoUser = new CognitoUser(userData);
        try {
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    console.log('Login successful:', result);
                    // Redirect to another route upon successful login
                    navigate('/home'); // Change '/home' to your desired route
                },
                onFailure: function (err) {
                    console.error('Login failed:', err);
                    // Optionally handle errors, e.g., show an alert or update component state
                    alert('Login failed: ' + err.message);
                }
            });
        } catch (err) {
            console.error('エラー発生してーーーーる');
            console.error(err);
        }
        
    };

    return (
        <form className="login-form" noValidate onSubmit={executeSignIn}>
            <div>
                <label htmlFor="username">メールアドレス:</label>
                <input
                    id="username"
                    type="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">パスワード:</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">ログイン</button>
            <button onClick={() => navigate('/')} type="button">戻る</button>
            <button onClick={() => navigate('/signup')} type="button">アカウント新規作成</button>
        </form>

    );
}
