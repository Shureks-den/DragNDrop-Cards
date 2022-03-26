import { MoveAble } from "../Moveable/moveable";
export class Card extends MoveAble {
    constructor(info: string, id: number) {
        super();
        const text = document.createElement('a');
        text.innerHTML = info;
        text.href = info;
        text.setAttribute('dataset', 'PersonalPage');
        text.setAttribute('dataid', id.toString());
        text.classList.add('card-text');
        this.moveable.appendChild(text);
        this.moveable.classList.add('card');
    }
}