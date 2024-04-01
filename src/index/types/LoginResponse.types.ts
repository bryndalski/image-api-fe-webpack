export type LoginResponse = {
    /**
     * The challenge name.
     */
    challengeName: 'SUCCESS' | 'INVALID_CREDENTIALS' | 'UNKNOWN_ERROR';
    /**
     * If the user is signed in.
     */
    isSignedIn: boolean;
}