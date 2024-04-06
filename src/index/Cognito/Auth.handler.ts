import {AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserSession} from 'amazon-cognito-identity-js';
import {LoginResponse} from "../types";

interface PoolData {
    UserPoolId: string;
    ClientId: string;
}

const poolData: PoolData = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID!,
    ClientId: process.env.COGNITO_CLIENT_ID!
};

const userPool = new CognitoUserPool(poolData);

interface AuthenticationData {
    Username: string;
    Password: string;
}

export class CCognitoHandler {

    /**
     * Logs the user in with the given username and password.
     * @param username {string} The username of the user.
     * @param password {string} The password of the user.
     */
    public static async login(username: string, password: string): Promise<LoginResponse> {
        const authenticationData: AuthenticationData = {
            Username: username,
            Password: password,
        };
        const authenticationDetails = new AuthenticationDetails(authenticationData);

        const userData = {
            Username: username,
            Pool: userPool,
        };
        const cognitoUser = new CognitoUser(userData);

        return new Promise((resolve, reject) => {
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result: CognitoUserSession) {
                    console.log('access token + ' + result.getAccessToken().getJwtToken());
                    resolve({challengeName: 'SUCCESS', isSignedIn: true});
                },

                onFailure: function (err: any) {
                    console.error(err);
                    if (err && err.name === 'NotAuthorizedException') {
                        resolve({challengeName: 'INVALID_CREDENTIALS', isSignedIn: false});
                    } else {
                        resolve({challengeName: 'UNKNOWN_ERROR', isSignedIn: false});
                    }
                },
            });
        });
    }

    /**
     * Defines whether the user is currently logged in.
     */
    public static isLogged(): Promise<boolean> {
        return new Promise(async(resolve, reject) => {
            console.log(!!userPool.getCurrentUser())
            resolve(!!await userPool.getCurrentUser())
        })
    }


    /**
     * Fetches the JWT token for the current user.
     */
    public static async fetchToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            const cognitoUser = userPool.getCurrentUser();
            if (cognitoUser) {
                cognitoUser.getSession(function (err: any, session: any) {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        resolve(session!.getIdToken().getJwtToken());
                    }
                });
            } else {
                reject('No user found');
            }
        });

    }


    /**
     * Logs the user out.
     */
    public static logout(): void {
        const cognitoUser = userPool.getCurrentUser();
        if (cognitoUser) {
            cognitoUser.signOut();
            window.location.href = '/login.html';
        } else {
            console.log('No user is currently logged in');
        }
    }

}
