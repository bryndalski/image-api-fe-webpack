import {v4} from "uuid";
import {UserTableRowTypes} from "./UserTableRow.types";
import {User} from "../../../index/types";

export class UserTableRow implements UserTableRowTypes {

    componentId: string = ""
    email: string;
    familyName: string;
    givenName: string;
    id: string;

    constructor(params: User) {
        Object.assign(this, params);
        this.componentId = v4();
    }

    destroy(): void {
        const element = document.getElementById(this.componentId);
        if (element) {
            element.remove();
        }
    }


    render() {
        return `
        <tr id="${this.componentId}">
            <td>${this.email}</td>
            <td>${this.givenName}</td>
            <td>${this.familyName}</td>
        </tr>
        `
    }


}