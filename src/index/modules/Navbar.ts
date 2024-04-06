import {FakeReactType} from "../types/FakeReact.type";
import {v4} from "uuid";

export class Navbar implements FakeReactType {
    componentId: string;

    constructor() {
        this.componentId = v4();
    }

render(): string {
    return `
       <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">
                <img class="logo_image"
                     src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"/>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                           data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://randomuser.me/api/portraits/men/41.jpg" class="rounded-circle" width="40"
                                 height="40">
                        </a>
                        <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                            <li><a class="dropdown-item" href="#">Show Profile</a></li>
                            <li><a class="dropdown-item" href="logout.html" id="log-out">Log Out</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
   `
}
    destroy(): void {
        const element = document.getElementById(this.componentId);
        if (element) {
            element.remove();
        }
    }
}