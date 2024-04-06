import axios from 'axios';
import {fetchUserAttributes} from '@aws-amplify/auth';
import {CCognitoHandler} from "../Cognito/Auth.handler";

const AxiosNetworking = axios.create({
    baseURL: 'http://127.0.0.1:3000/api',
    timeout: 10000,
});

AxiosNetworking.interceptors.request.use(async function (config) {
    const idToken = await CCognitoHandler.fetchToken();
    config.headers.Authorization = idToken ? `Bearer ${idToken}` : '';
    return config;
});
export default  AxiosNetworking;