import { fetchAuthSession } from '@aws-amplify/core';
import type { JWT } from 'aws-amplify/auth';
import { fetchUserAttributes, signIn } from 'aws-amplify/auth';
import {LoginResponse} from "../types";

export class CCognitoHandler {
  //================== LOGIN ==================
  /**
   * Login to Cognito with the given username and password.
   * @param username The username to log in with.
   * This is the email address.
   * @param password User password
   * @returns {Promise<LoginResponse>} Status of login response
   */
  public static async login(
    username: string,
    password: string,
  ): Promise<LoginResponse> {
    try {
      const { isSignedIn } = await signIn({ username, password });

      return {
        challengeName:'SUCCESS',
        isSignedIn,
      }

    } catch (error) {
      console.log('error', error);
      if (
        typeof error === 'object' &&
        error &&
        'name' in error &&
        error.name === 'NotAuthorizedException'
      ) {
        return { challengeName: 'INVALID_CREDENTIALS', isSignedIn: false };
      }
      return { challengeName: 'UNKNOWN_ERROR', isSignedIn: false };
    }
  }

  /**
   * Extracts the user roles from the user attributes.
   * @returns {Promise<SystemRoles[]>} The user roles from cognito.
   * @throws {Error} If the user is not logged in.
   *
   * @example
   * const userRoles = await CCognitoHandler.getUserGroups();
   * userRoles // ['root']
   *
   * @example
   * const userRoles = await CCognitoHandler.getUserGroups(); // throws Error('NotAuthorizedException')
   *
   */
  public static async getUserGroups(): Promise<string[]> {
    const { tokens } = await fetchAuthSession();
    if (!tokens || !tokens.idToken) throw Error('NotAuthorizedException');
    const idToken: JWT = tokens.idToken;
    return (idToken.payload['cognito:groups'] as string[]) || [];
  }

}