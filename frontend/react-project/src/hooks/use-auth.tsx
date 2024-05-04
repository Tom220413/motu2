
import { userPool } from "../components/Congnito";
import React, { useContext, createContext, useState, ReactNode, FunctionComponent } from 'react';
import { CognitoUserAttribute, CognitoUserPool, AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";

interface AuthContextType {
    user: CognitoUser | null;
    isAuthenticated: boolean; // 認証状態を表す
    signUp: (username: string, password: string, email: string) => void;
    signIn: (username: string, password: string) => void;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
    return useContext(AuthContext);
}
type Props = {
    children?: React.ReactNode;
};

export const ProvideAuth: React.FC<Props>= ({ children }) => {
    const [user, setUser] = useState<CognitoUser | null>(null);
    const isAuthenticated = Boolean(user);

    const signUp = async (username: string, password: string, email: string) => {
        const userAttributes = [
            { Name: "name", Value: username },
            { Name: "family_name", Value: "テスト" },
            { Name: "given_name", Value: "テスト" },
            { Name: "email", Value: email },
            { Name: "address", Value: "aa" },
            { Name: "gender", Value: "0" }
        ];
        const attributeList = userAttributes.map(attr => new CognitoUserAttribute(attr));

        return new Promise((resolve, reject) => {
            userPool.signUp(username, password, attributeList, [], (err, result) => {
                if (err) {
                    console.error(err);
                    reject({ success: false, message: err.message });
                } else {
                    console.log('User name is ' + result.user.getUsername());
                    setUser(result.user);
                    resolve({ success: true, user: result.user });
                }
            });
        });
    };

    const signIn = (username: string, password: string) => {
        const authenticationDetails = new AuthenticationDetails({
            Username: username,
            Password: password
        });

        const userData = { Username: username, Pool: userPool };
        const cognitoUser = new CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: result => {
                console.log('Login successful:', result);
                setUser(cognitoUser);
            },
            onFailure: err => {
                console.error('Login failed:', err);
            }
        });
    };

    const signOut = () => {
        const cognitoUser = userPool.getCurrentUser();
        if (cognitoUser) {
            cognitoUser.signOut();
            setUser(null);
            console.log('User logged out.');
        }
    };

    const value = { user, isAuthenticated, signUp, signIn, signOut };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
