import React, { useState, useEffect } from 'react';
import { profile, put_profile } from '../../../apis/apis'
import axios from 'axios';

interface ProfileEditProps {
    userId: number ;  
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ userId }) => {
    const [profileModel, setProfile] = useState({
        name: '',
        email: '',
        bio: '',
        gender: '0' // 初期値を未回答(0)に設定
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // ユーザー情報を取得する
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await profile(userId);
                setProfile(data);
            } catch (err) {
                setError('プロフィール情報の取得に失敗しました。');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [userId]);

    // フォームの値が変更されたときのハンドラー
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target as HTMLInputElement | HTMLTextAreaElement;
        setProfile({ ...profileModel, [name]: value });
    };


    // 更新処理
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await put_profile(userId, profile);
            alert('プロフィールを更新しました。');
        } catch (err) {
            setError('プロフィールの更新に失敗しました。');
        }
    };

    if (loading) return <div>読み込み中...</div>;
    if (error) return <div>{error}</div>;

    // フォームの値が変更されたときのハンドラー
    const handleChangeGender = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setProfile({ ...profileModel, [name]: value });
    };


    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
                <label htmlFor="name">名前:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="bio">自己紹介:</label>
                <textarea
                    name="bio"
                    id="bio"
                    value={profileModel.bio}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="gender">性別:</label>
                <select
                    name="gender"
                    id="gender"
                    value={profileModel.gender}
                    onChange={handleChangeGender}
                    className="form-control">
                    <option value="0">未回答</option>
                    <option value="1">男性</option>
                    <option value="2">女性</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="email">メール:</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={profileModel.email}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <button type="submit" className="submit-button">更新</button>
        </form>
    );
};

export default ProfileEdit;
