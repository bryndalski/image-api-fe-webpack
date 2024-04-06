import "./scss/index.scss"
import {Navbar} from "../index/modules/Navbar";
import AxiosNetworking from "../index/networking/axios-config.axios";
import {AddUserModal, UserTable} from "./Components";


const fetchUsers = async () => {
    try {
        const {data} = await AxiosNetworking.get('/users/all',{
            params:{
                Limit:60
            }
        })
        console.log(data)
    } catch (e) {
        console.log(e)
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    const body = document.querySelector('body');
    await fetchUsers()
    body.innerHTML += new Navbar().render()
    const userModal = new AddUserModal()
    body.innerHTML += userModal.render()

    body.innerHTML += `
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addUserModal">
        Dodaj użytkownika
    </button>
    `;

    body.innerHTML += new UserTable().render()

    // Add the event listener after the HTML is added to the document
    const form = document.getElementById('addUserForm');
    form.addEventListener('submit', async (event)=>await userModal.submitForm(event));
})