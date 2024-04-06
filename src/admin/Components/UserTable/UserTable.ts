import { v4 } from "uuid";
import {FakeReactType, User} from "../../../index/types";
import {UserTableRow} from "../UserTableRow/UserTableRow";
import {generateUsers} from "./GenerateUsers";


/**
 * A table that displays a list of users.
 * The table is populated with fake data.
 * The table is styled using Bootstrap.
 * The table is centered on the page.
 * The table is striped.
 */
export class UserTable implements FakeReactType  {
    componentId: string;
    users: User[] = []
    loading: boolean = true

    constructor() {
        this.componentId = v4();
        this.loading = false;
        this.users = generateUsers(10)
    }


    destroy(): void {
        const element = document.getElementById(this.componentId);
        if (element) {
            element.remove();
        }
    }

    render() {
        if (this.loading) {
            return `<div id="${this.componentId}">Loading...</div>`;
        } else {
            return `
          <div class="d-flex justify-content-center">
            <table id="${this.componentId}" class="table table-striped">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Family Name</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.users.map(user => new UserTableRow(user).render()).join("")}
                </tbody>
            </table>
        </div>
            `;
        }
    }
}