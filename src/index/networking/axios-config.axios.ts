import axios from 'axios';
import {fetchUserAttributes} from '@aws-amplify/auth';

const instance = axios.create({
    baseURL: 'https://your-api-url.com',
    timeout: 10000,
});

instance.interceptors.request.use(async function (config) {
    const {idToken} = await fetchUserAttributes();
    config.headers.Authorization = idToken ? `Bearer ${idToken}` : '';
    return config;
});
export default instance;