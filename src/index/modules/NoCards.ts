import {FakeReactType} from "../types/FakeReact.type";
import {v4} from "uuid";

export  class NoCards implements FakeReactType {
    componentId: string;

    constructor() {
        this.componentId = v4();
    }

    render(): string {
        return `
            <div class="alert alert-warning" role="alert">
                No cards to show. Please add a new card.
            </div>
        `;
    }

    destroy(): void {
        const element = document.getElementById(this.componentId);
        if (element) {
            element.remove();
        }
    }
}