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
            console.log(anotherElem);
            this.#activeElement.hidden = false;
            if (anotherElem instanceof HTMLDivElement && anotherElem.classList.contains('card')) {
                const {left, top} = this.#activeElement.getBoundingClientRect();
                const deltaX = left - anotherElem.getBoundingClientRect().left;
                const deltaY = top - anotherElem.getBoundingClientRect().top;
                console.log(deltaX, deltaY);
                console.log(Math.hypot(deltaX, deltaY));
                if (Math.hypot(deltaX, deltaY) <= this.#sufficientDistance) {
                    this.#activeElement.style.transform = `translate(${-deltaX}px,${-deltaY}px)`;
                    anotherElem.style.transform = `translate(${deltaX}px,${deltaY}px)`;
                    setTimeout(() => {
                        this.#activeElement?.style.removeProperty('transform');
                        anotherElem.style.removeProperty('transform');
                    }, 0.2);
                    this.#activeElement = null;
                }
            }
        });
        this.#grid.addEventListener('mousedown', (e) => {
            console.log('down')
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
            this.#activeElement = null;
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