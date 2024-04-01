import {FakeReactType} from "../types/FakeReact.type";
import {v4} from "uuid";

/**
 * Used to render loading spinner
 */
export class LoadingState implements FakeReactType{
    componentId: string;

    constructor() {
        this.componentId = v4();
    }
    render(): string {
        return `
            <div class="d-flex justify-content-center align-items-center" style="height: 100vh;" id="${this.componentId}">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
        </div>
        `
    }

    destroy() {
        const element = document.getElementById(this.componentId);
        console.log(element);
        if (element) {
            element.remove();
        }
    }


}