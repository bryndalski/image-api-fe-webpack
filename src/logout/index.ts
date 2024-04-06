import {CCognitoHandler} from "../index/Cognito/Auth.handler";


window.addEventListener('load', async () => {
    if (!await CCognitoHandler.isLogged()) {
        window.location.href = '/logged.html';
    }
})

document.addEventListener("DOMContentLoaded", async function () {
    const logoutButton = document.getElementById('logoutBtn');
    setTimeout(() => {
        CCognitoHandler.logout()
        window.location.href = '/login.html';
    }, 3000)

})