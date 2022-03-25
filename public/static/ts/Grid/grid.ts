import { MoveAble } from "../Moveable/moveable";

export class Grid {
    #grid: HTMLDivElement;
    #moveableArr : MoveAble[];
    #activeElement: HTMLDivElement | null;
    #sufficientDistance = 150;
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
        });
        this.#grid.addEventListener('mousedown', (e) => {
            if (e.target instanceof HTMLDivElement && e.target.classList.contains("card")) {
                this.moveableMouseOver(e.target);
                this.lockElement(e.target);
                this.moveableDragStart(e.target);
                e.target.addEventListener('drag', this.moveableDragging.bind(this));
            }
        });
        this.#grid.addEventListener('mouseup', () => {
            if (this.#activeElement !== null) {
                this.moveableMouseOut(this.#activeElement);
                this.moveableDragEnd(this.#activeElement);
                this.#activeElement.removeEventListener('drag', this.moveableDragging.bind(this));
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
        this.#activeElement = null;
    }

    moveableDragging(e:MouseEvent) {
        if (this.#activeElement === null) {
            return;
        }
        this.#activeElement.hidden = true;
        const anotherElem = document.elementFromPoint(e.clientX, e.clientY)?.closest('.card');
        const anotherElemCoord = anotherElem?.getBoundingClientRect();
        this.#activeElement.hidden = false;
        console.log(anotherElem)
        if (anotherElemCoord !== undefined )
        console.log(Math.hypot((e.clientX - anotherElemCoord?.left), (e.clientY - anotherElemCoord?.top)))
        if (anotherElemCoord !== undefined && Math.hypot((e.clientX - anotherElemCoord?.left), 
            (e.clientY - anotherElemCoord?.top)) < this.#sufficientDistance) {
            this.#grid.removeChild(this.#activeElement);
            this.#grid.insertBefore(this.#activeElement, <HTMLDivElement>anotherElem);
            this.moveableMouseOut(this.#activeElement);
            this.moveableDragEnd(this.#activeElement);
            this.#activeElement = null;
        }
    }
}