import { CognitoUserPool } from 'amazon-cognito-identity-js';

console.log(process.env.REACT_APP_AUTH_USER_POOL_ID)
console.log(process.env.REACT_APP_AUTH_USER_POOL_WEB_CLIENT_ID)

const poolData = {
    UserPoolId: process.env.REACT_APP_AUTH_USER_POOL_ID,
    ClientId: process.env.REACT_APP_AUTH_USER_POOL_WEB_CLIENT_ID 
};

const userPool = new CognitoUserPool(poolData);

export { userPool };
