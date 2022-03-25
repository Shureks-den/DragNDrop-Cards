import { MoveAble } from "../Moveable/moveable";

export class Grid {
    #grid: HTMLDivElement;
    #moveableArr : MoveAble[];
    #activeElement: HTMLDivElement | null;
    #sufficientDistance = 10;
    constructor(root: HTMLDivElement) {
        this.#activeElement = null;
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
        this.#grid.appendChild(obj.obj);
    }

    makeMovemenet() {
        this.#grid.addEventListener('mousemove', (e: MouseEvent) => {
            if (this.#activeElement === null) {
                return;
            }
            this.#activeElement.hidden = true;
            const anotherElem = document.elementFromPoint(e.clientX, e.clientY)?.closest('.card');
            this.#activeElement.hidden = false;
            if (anotherElem instanceof HTMLDivElement && anotherElem.classList.contains('card')) {
                this.#grid.removeChild(this.#activeElement);
                this.#grid.insertBefore(this.#activeElement, anotherElem);
            }
        });
        this.#grid.addEventListener('mousedown', (e) => {
            if (e.target instanceof HTMLDivElement && e.target.classList.contains("card")) {
                this.lockElement(e.target);
                this.moveableDragStart(e.target);
            } else if (e.target instanceof HTMLSpanElement && 
                (<HTMLElement>e.target?.parentNode).classList.contains("сard")) {
                this.moveableDragStart(<HTMLDivElement>e.target.parentNode);
                this.lockElement(<HTMLDivElement>e.target.parentNode);
            }
        });
        this.#grid.addEventListener('mouseup', () => {
            if (this.#activeElement !== null) {
                this.moveableMouseOut(this.#activeElement);
                this.moveableDragEnd(this.#activeElement);
                this.#activeElement = null;
            }
        });
    }

    lockElement(target: HTMLDivElement) {
        this.#activeElement = target;
    }

    moveableMouseOver(moveable: HTMLDivElement) {
        moveable.draggable = true;
    }
    moveableDragStart(moveable: HTMLDivElement) {
        moveable.classList.add('dragable');
    }
    moveableMouseOut(moveable: HTMLDivElement) {
        moveable.draggable = false;
    }
    moveableDragEnd(moveable: HTMLDivElement) {
        moveable.classList.remove('dragable');
    }
}