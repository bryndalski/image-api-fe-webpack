import {FakeReactType} from "../types/FakeReact.type";
import {v4} from "uuid";

/**
 * CardList class
 */
export class Card implements FakeReactType {

    componentId: string;
    constructor(public imageUrl: string, public name: string, public isFavorited: boolean) {
        this.componentId = v4()
    }

    /**
     * Returns html string
     */
    render(): string {
        return `
            <div class="card" style="width: 18rem; height: 20rem" id="${this.componentId}">
                <img src="${this.imageUrl}" class="card-img-top" style="height: 15rem" alt="${this.name}">
                <div class="card-body">
                    <h5 class="card-title">${this.name}</h5>
                    <p class="card-text">${this.isFavorited ? '❤️' : '♡'}</p>
                </div>
            </div>
        `;
    }

    destroy() {
        const card = document.getElementById(this.componentId);
        card?.remove();
    }
}
