import "./scss/index.scss"
import {ImageTypes} from "./types";
import {Card} from "./modules/Card";
import AxiosNetworking from "./networking/axios-config.axios";
import {CardList} from "./modules/ClassList";
import {Navbar} from "./modules/Navbar";
import {CCognitoHandler} from "./Cognito/Auth.handler";

window.addEventListener('load', async () => {
    if (!await CCognitoHandler.isLogged()) {
        window.location.href = '/login.html';
    }
})


async function uploadImage(uuid: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await AxiosNetworking.post('/images/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('Image uploaded successfully:', response);
    } catch (error) {
        console.error('Failed to upload image:', error);
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    const body = document.querySelector('body');
    body.innerHTML += new Navbar().render()
    body.innerHTML += `
       <button type="button" class="btn btn-primary m-2" data-toggle="modal" data-target="#myModal">
            Add Image
        </button>
    `


    const cardList = new CardList()
    body.innerHTML += cardList.render();
    const cardContainer = document.getElementById("card-list");
    // Fetch images
    try {
        const response = await AxiosNetworking.get('images/getImages');
        const {images} = response.data;
        console.log('Images:', images);
        images?.forEach((imageUrl: ImageTypes) => {
            const cardComponent = new Card(imageUrl.imageUrl, imageUrl.imageName, imageUrl.isLoved);
            cardContainer?.insertAdjacentHTML('beforeend', cardComponent.render());
        });
    } catch (error) {
        console.error('Failed to fetch images:', error);
    }


    const uploadButton = document.getElementById('uploadBtn');
    uploadButton.addEventListener('click', async () => {
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        const file = fileInput.files[0];
        if (file) {
            // Replace 'uuid' with the actual UUID of the user
            await uploadImage('uuid', file);
        } else {
            console.log('No file selected');
        }
    });
});