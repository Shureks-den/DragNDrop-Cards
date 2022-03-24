import { MoveAble } from "../Moveable/moveable";
export class Card extends MoveAble {
    #card: HTMLDivElement
    constructor(info: string) {
        super();
        this.#card = document.createElement('div');
        this.#card.innerHTML = info;
        this.#card.classList.add('card');
    }

    get card() : HTMLDivElement {
        return this.#card;
    }
}