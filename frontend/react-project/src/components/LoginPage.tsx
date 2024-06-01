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
    const [newPassword, setNewPassword] = useState('');
    const [isNewPasswordRequired, setIsNewPasswordRequired] = useState(false);
    const [cognitoUser, setCognitoUser] = useState(null);
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
        setCognitoUser(cognitoUser);

        try {
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    console.log('Login successful:', result);
                    // Redirect to another route upon successful login
                    navigate('/home'); // Change '/home' to your desired route
                },
                onFailure: function (err) {
                    console.error('Login failed:', err);
                    console.error('Error details:', JSON.stringify(err, null, 2));
                    // Optionally handle errors, e.g., show an alert or update component state
                    alert('Login failed: ' + err.message);
                },
                newPasswordRequired: function (userAttributes, requiredAttributes) {
                    // User was signed up by an admin and must provide new password and required attributes
                    console.log('New password required:', userAttributes, requiredAttributes);
                    setIsNewPasswordRequired(true);
                }
            });
        } catch (err) {
            console.error('An unexpected error occurred:', err);
        }
    };

    const handleNewPasswordSubmit = (event) => {
        event.preventDefault();
        if (cognitoUser) {
            cognitoUser.completeNewPasswordChallenge(newPassword, {}, {
                onSuccess: function (result) {
                    console.log('Password change successful:', result);
                    navigate('/home'); // Change '/home' to your desired route
                },
                onFailure: function (err) {
                    console.error('Password change failed:', err);
                    alert('Password change failed: ' + err.message);
                }
            });
        }
    };

    return (
        <div>
            {!isNewPasswordRequired ? (
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
            ) : (
                <form className="login-form" noValidate onSubmit={handleNewPasswordSubmit}>
                    <div>
                        <label htmlFor="username">メールアドレス:</label>

                            <input
                            id="username"
                            type="email"
                            value={username}
                            readOnly // フィールドを読み取り専用に設定
                            />
                            <label>初回ログインなのでパスワードを再設定する必要があります</label>

                        <label htmlFor="newPassword">新しいパスワード:</label>
                        <input
                            id="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">新しいパスワードを設定する</button>
                </form>
            )}
        </div>
    );

}
