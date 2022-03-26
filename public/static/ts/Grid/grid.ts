import { MoveAble } from "../Moveable/moveable";

export class Grid {
    #grid: HTMLDivElement;
    #moveableArr : MoveAble[];
    #activeElement: HTMLDivElement | null;
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
        this.#grid.addEventListener('mousedown', (e) => {
            if (e.target instanceof HTMLDivElement && e.target.classList.contains("card")) {
                console.log('down')
                this.moveableMouseOver(e.target);
                this.lockElement(e.target);
                this.moveableDragStart(e.target);
                e.target.addEventListener('drag', this.moveableDragging.bind(this));
            }
        });
        this.#grid.addEventListener('mouseup', (e) => {
            if (this.#activeElement !== null) {
                console.log('up')
                this.#activeElement.removeEventListener('drag', this.moveableDragging.bind(this));
                this.moveableMouseOut(this.#activeElement);
                this.moveableDragEnd(this.#activeElement);
                this.#activeElement = null;
            }
        });

        this.#grid.addEventListener('dragover', (e)=> {
            e.preventDefault();
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

    moveableDragging(e:MouseEvent) {
        if (this.#activeElement === null) {
            return;
        }
        this.#activeElement.hidden = true;
        const anotherElem = document.elementFromPoint(e.clientX, e.clientY)?.closest('.card');
        this.#activeElement.hidden = false;
        if (this.#activeElement !== <HTMLDivElement> anotherElem && anotherElem !== null) {
            console.log('kek')
            this.#grid.removeChild(this.#activeElement);
            this.#grid.insertBefore(this.#activeElement, <HTMLDivElement>anotherElem);
            this.moveableMouseOut(this.#activeElement);
            this.moveableDragEnd(this.#activeElement);
        }
    }
}