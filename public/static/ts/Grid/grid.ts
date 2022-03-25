import { MoveAble } from "../Moveable/moveable";

export class Grid {
    #grid: HTMLDivElement;
    #moveableArr : MoveAble[];
    constructor(root: HTMLDivElement) {
        this.#moveableArr = new Array();
        this.#grid = document.createElement('div');
        this.#grid.classList.add('grid-wrapper');
        root.appendChild(this.#grid);
        this.makeMovemenet();
    }

    get grid():HTMLDivElement {
        return this.#grid;
    }

    appendMoveable(obj: MoveAble) {
        this.#moveableArr.push(obj);
        this.#grid.appendChild(obj.card);
    }

    makeMovemenet() {
        this.#grid.addEventListener('mousemove', (e: MouseEvent) => {
            if (e.target instanceof HTMLDivElement) {
                console.log(e.target.getBoundingClientRect().left, e.target.getBoundingClientRect().top);
                console.log(e.target.closest('.Card'));
            }
        })
    }
}