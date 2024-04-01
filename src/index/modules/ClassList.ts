import type {CardType} from "../types/Cart.type";
import {FakeReactType} from "../types/FakeReact.type";
import {v4} from "uuid";
export class CardList implements FakeReactType{
    cards: {[key: string]: CardType } = {};
    componentId: string;
    constructor() {
        this.componentId = v4();
    }
    addCard(card: CardType) {
        console.log(card);
    }

    render(): string {
        return  `
        <div class="d-flex justify-content-center align-items-center vh-100 vw-100 bg-red-100" id="${this.componentId}">
            <div id="card-list" class="mx-auto my-auto"></div>
        </div>
        `
    }
    destroy(): void {
        const container = document.getElementById(this.componentId);
        container?.remove();
    }
}