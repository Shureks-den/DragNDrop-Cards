import { MoveAble } from "../Moveable/moveable";
export class Card extends MoveAble {
    constructor(info: string) {
        super();
        const text = document.createElement('span');
        text.innerHTML = info;
        text.classList.add('card-text');
        this.moveable.appendChild(text);
        this.moveable.classList.add('card');
    }
}