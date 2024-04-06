import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ProfilePage = () => {
    const navigate = useNavigate()
    const { userId } = useParams<{ userId: string }>()
    return (
        <div>
            <h1>プロフィール</h1>
            ユーザー{userId}のプロフィールページです。ログインしていないユーザは見れません。
            <button onClick={() => navigate("/")}>ホームへ戻る</button>
        </div>
    )
}

export default ProfilePage