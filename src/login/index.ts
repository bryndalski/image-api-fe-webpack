import "./scss/style.scss"
import {configureAmplify} from "../index/amplify/amplify";
import {CCognitoHandler} from "../index/Cognito/Auth.handler";

configureAmplify();


window.addEventListener('load', async () => {
    if (await CCognitoHandler.isLogged()) {
        window.location.href = '/index.html';
    }
})


document.addEventListener("DOMContentLoaded", async function () {
    const imageGrid = document.getElementById('image-grid');
    for (let i = 0; i < 150; i++) {
        const cell = document.createElement('div');
        cell.classList.add('image-cell');
        cell.style.backgroundImage = `url('https://picsum.photos/100/100/?random&t=${new Date().getTime() + Math.random() * 1000}')`;
        imageGrid.appendChild(cell);
    }


    const form = document.querySelector('#login_form');
    const emailInput = document.getElementById('form2Example11') as HTMLInputElement;
    const passwordInput = document.getElementById('form2Example22') as HTMLInputElement;
    const errorElement = document.createElement('p');
    errorElement.style.color = 'red';
    form.appendChild(errorElement);

    form.addEventListener('submit', async (event) => {
        event.preventDefault();


        const email = emailInput.value;
        const password = passwordInput.value;

        if (email === '' || password === '') {
            errorElement.innerText = 'Please enter email and password';
            return;
        }

        //validate email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorElement.innerText = 'Please enter a valid email address';
            return;
        }

        const {challengeName, isSignedIn} = await CCognitoHandler.login(email, password)

        if (isSignedIn) {
            window.location.href = '/index.html';
        } else {
            errorElement.innerText = challengeName === 'INVALID_CREDENTIALS' ? 'Invalid credentials' : 'An unknown error occurred';
        }
    });
}, {once: true});
