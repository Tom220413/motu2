import React, { useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { useNavigate } from 'react-router-dom';  // useNavigate フックをインポート
import './signupform.css'; // CSSファイルのインポート

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [givenname, setGivenname] = useState('');
    const [familyname, setFamilyname] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const { signUp } = useAuth();

    const navigate = useNavigate(); // useNavigate フックを使用して navigate 関数を取得

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            // password:email: string, address: string, gender: string, givenName: string, familyName: string, name: string
            const res = await signUp(password, email, address, gender, givenname, familyname, "Example-User");
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
                    メールアドレス:
                    <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label className="form-label">
                    電話番号:s
                    <input className="form-input" type="phonenumber" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
                </label>^
                <label className="form-label">
                    パスワード:
                    <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label className="form-label">
                    住所:
                    <input className="form-input" type="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </label>
                <label className="form-label">
                    <select value={gender} onChange={e => setGender(e.target.value)}>
                        <option value="">性別を選択</option>
                        <option value="0">男性</option>
                        <option value="1">女性</option>
                        <option value="2">未回答</option>
                    </select>
                </label>
                <label className="form-label">
                    姓:
                    <input className="form-input" type="givenname" value={givenname} onChange={(e) => setGivenname(e.target.value)} />
                </label>
                <label className="form-label">
                    名:
                    <input className="form-input" type="familyname" value={familyname} onChange={(e) => setFamilyname(e.target.value)} />
                </label>
                
                <button className="form-button" type="submit">アカウント登録</button>
                <label className="form-label" />
                <button className="back-button" onClick={() => navigate('/login')} type="button">ログイン画面へ戻る</button>
            </form>
        </div>
    );
};

export default SignupForm;
