import type {CardType} from "../types";
import type {FakeReactType} from "../types";
import {v4} from "uuid";
export class CardList implements FakeReactType{
    componentId: string;
    constructor() {
        this.componentId = v4();
    }
    addCard(card: CardType) {
        console.log(card);
    }

    render(): string {
        return  `
        <div id="card-list"></div>
        `
    }
    destroy(): void {
        const container = document.getElementById(this.componentId);
        container?.remove();
    }
}