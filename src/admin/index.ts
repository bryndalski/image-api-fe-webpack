import "./scss/index.scss"
import {Navbar} from "../index/modules/Navbar";
import {AddUserModal, UserTable} from "./Components";


document.addEventListener("DOMContentLoaded", async function () {
    const body = document.querySelector('body');
    body.innerHTML += new Navbar().render()
    const userModal = new AddUserModal()
    body.innerHTML += userModal.render()

    body.innerHTML += `
    <button type="button" class="btn btn-primary m-2" data-toggle="modal" data-target="#addUserModal">
        Dodaj użytkownika
    </button>
    `;

    body.innerHTML += new UserTable().render()

    // Add the event listener after the HTML is added to the document
    const form = document.getElementById('addUserForm');
    form.addEventListener('submit', async (event) => await userModal.submitForm(event));
})