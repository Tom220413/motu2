import { userPool } from "../components/Congnito";
import React, { useContext, createContext, useState, ReactNode, FunctionComponent } from 'react';
import { CognitoUserAttribute, CognitoUserPool, AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";

interface AuthContextType {
    user: CognitoUser | null;
    isAuthenticated: boolean;
    signUp: (username: string, password: string, email: string, address: string, gender: string, givenName: string, familyName: string) => void;
    signIn: (username: string, password: string) => void;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
    return useContext(AuthContext);
}

type Props = {
    children?: ReactNode;
};

export const ProvideAuth: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<CognitoUser | null>(null);
    const isAuthenticated = Boolean(user);

    const signUp = async ( password: string, email: string, address: string, gender: string, givenName: string, familyName: string, name: string) => {
        const userAttributes = [
            { Name: "email", Value: email },
            { Name: "address", Value: address },
            { Name: "gender", Value: gender },
            { Name: "given_name", Value: givenName },
            { Name: "family_name", Value: familyName },
            { Name: "name", Value: name }
        ];
        console.log(password)
        const attributeList = userAttributes.map(attr => new CognitoUserAttribute(attr));

        return new Promise((resolve, reject) => {
            userPool.signUp(name, password, attributeList, null, (err, result) => {
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

    const signIn = (name: string, password: string) => {
        const authenticationDetails = new AuthenticationDetails({
            Username: name,
            Password: password
        });

        const userData = { Username: name, Pool: userPool };
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
