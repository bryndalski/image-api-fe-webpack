import { v4 } from "uuid";
import {FakeReactType, User} from "../../../index/types";
import {UserTableRow} from "../UserTableRow/UserTableRow";

export class UserTable implements FakeReactType  {
    componentId: string = ""
    users: User[] = []
    loading: boolean = true

    constructor() {
        this.componentId = v4();
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
            <table id="${this.componentId}">
                <tr>
                    <th>Email</th>
                    <th>Given Name</th>
                    <th>Family Name</th>
                </tr>
                ${this.users.map(user => new UserTableRow(user).render()).join("")}
            </table>
            `;
        }
    }
}