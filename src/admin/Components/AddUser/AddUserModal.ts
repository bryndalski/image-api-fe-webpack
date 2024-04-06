import {FakeReactType} from "../../../index/types";
import {v4} from "uuid";
import AxiosNetworking from "../../../index/networking/axios-config.axios";

export class AddUserModal implements FakeReactType {

    componentId: string;

    constructor() {
        this.componentId = v4();
    }

    async submitForm(event: Event) {
        event.preventDefault();

        const email = (document.getElementById('email') as HTMLInputElement).value;
        const familyName = (document.getElementById('familyName') as HTMLInputElement).value;
        const givenName = (document.getElementById('givenName') as HTMLInputElement).value;

        try {
            const response = await AxiosNetworking.post('users/create', {
                email,
                familyName,
                givenName
            });

            alert('User created successfully');

            const modalElement = document.getElementById('addUserModal');
            modalElement.classList.remove('show');
            modalElement.style.display = 'none';

            const modalBackdrop = document.querySelector('.modal-backdrop');
            if (modalBackdrop) {
                modalBackdrop.remove();
            }
        } catch (error) {
            alert('Failed to create user');
        }
    }

    destroy(): void {
        const modal = document.getElementById('addUserModal');
        modal.remove();
    }

    render() {
        return `
            <div class="modal fade" id="addUserModal" tabindex="-1" role="dialog" aria-labelledby="addUserModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="addUserModalLabel">Add User</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="addUserForm">
                                <div class="form-group">
                                    <label for="email">Email address</label>
                                    <input type="email" class="form-control" id="email" required pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" maxlength="50">
                                </div>
                                <div class="form-group">
                                    <label for="familyName">Family Name</label>
                                    <input type="text" class="form-control" id="familyName" required maxlength="50">
                                </div>
                                <div class="form-group">
                                    <label for="givenName">Given Name</label>
                                    <input type="text" class="form-control" id="givenName" required maxlength="50">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" form="addUserForm" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }


}