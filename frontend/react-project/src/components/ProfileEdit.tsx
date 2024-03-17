import React, { useState, useEffect } from 'react';
import { profile } from '../apis/todos'
import axios from 'axios';

interface ProfileEditProps {
    userId: number ;  
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ userId }) => {
    const [profileModel, setProfile] = useState({ name: '', email: '', bio: '' });
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
            await axios.put(`/api/users/${userId}`, profile);
            alert('プロフィールを更新しました。');
        } catch (err) {
            setError('プロフィールの更新に失敗しました。');
        }
    };

    if (loading) return <div>読み込み中...</div>;
    if (error) return <div>{error}</div>;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>名前:</label>
                <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>メール:</label>
                <input
                    type="email"
                    name="email"
                    value={profileModel.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>自己紹介:</label>
                <textarea
                    name="bio"
                    value={profileModel.bio}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">更新</button>
        </form>
    );
};

export default ProfileEdit;
