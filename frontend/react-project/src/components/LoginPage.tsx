import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useLogin } from './AuthUserContext'

const LoginPage = () => {
    const history = useHistory()
    const location = useLocation<{ from: { pathname: string } } | undefined>()
    const login = useLogin()
    const [userId, setUserId] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleLogin = async () => {
        try {
            await login(userId)
            history.replace(location.state?.from || '/')
        } catch (error) {
            console.error(error)
            setErrorMessage("ログインに失敗しました")
        }
    }

    return (
        <div>
            <p>{errorMessage}</p>
            <input type="text" value={userId} onChange={e => setUserId(e.target.value)} />
            <button onClick={handleLogin}>送信</button>
            <button onClick={() => history.push("/")}>ホームへアクセスしてみる</button>
        </div>
    )
}

export default LoginPage
