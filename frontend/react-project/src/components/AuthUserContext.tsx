import React, { createContext, useContext, useState } from "react"
import { AuthUser, OperationType } from "../types/types"

const AuthUserContext = createContext<AuthUser | null>(null)
const AuthOperationContext = createContext<OperationType>({
    login: (_) => console.error("Providerが設定されていません"),
    logout: () => console.error("Providerが設定されていません")
})
type Props = {
    children?: React.ReactNode;
};

const AuthUserProvider: React.FC<Props> = ({ children }) => {
    const [authUser, setAuthUser] = useState<AuthUser | null>(null)
    const login = async (userid: string) => {
        //　ログイン処理　await login()
        setAuthUser({ userid })
    }
    const logout = async () => {
        //await logout() //ログアウト処理
        setAuthUser(null)
    }
    return (
        <AuthOperationContext.Provider value={{ login, logout }}>
            <AuthUserContext.Provider value={authUser}>
                {children}
            </AuthUserContext.Provider>
        </AuthOperationContext.Provider>
    )
}

export const useAuthUser = () => useContext(AuthUserContext)
export const useLogin = () => useContext(AuthOperationContext).login
export const useLogout = () => useContext(AuthOperationContext).logout

export default AuthUserProvider