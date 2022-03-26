import { MoveAble } from "../Moveable/moveable";

export class Grid {
    #grid: HTMLDivElement;
    #moveableArr : MoveAble[];
    #activeElement: HTMLDivElement | null;
    #lastRect: DOMRect;
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
        this.#lastRect = this.#moveableArr[this.#moveableArr.length - 1].obj.getBoundingClientRect();
    }

    makeMovemenet() {
        this.#grid.addEventListener('mousedown', (e) => {
            if (e.target instanceof HTMLDivElement && e.target.classList.contains("card")) {
                this.moveableMouseOver(e.target);
                this.lockElement(e.target);
                this.moveableDragStart(e.target);
                e.target.addEventListener('drag', this.moveableDragging.bind(this));
            }
        });
        this.#grid.addEventListener('mouseup', (e) => {
            if (this.#activeElement !== null) {
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
        let anotherElem = document.elementFromPoint(e.clientX, e.clientY)?.closest('.card');
        this.#activeElement.hidden = false;
        if ((e.clientX >= this.#lastRect.left && e.clientY >= this.#lastRect.top)
            && (e.clientX <= this.#lastRect.right && e.clientY <= this.#lastRect.bottom)) {
            this.#grid.removeChild(this.#activeElement);
            this.#grid.appendChild(this.#activeElement);
            return;
        }
        if (this.#activeElement !== <HTMLDivElement> anotherElem || anotherElem !== null) {
            if (!anotherElem?.classList.contains('card')) {
                return;
            }
            this.#grid.removeChild(this.#activeElement);
            this.#grid.insertBefore(this.#activeElement, <HTMLDivElement>anotherElem);
            this.moveableMouseOut(this.#activeElement);
            this.moveableDragEnd(this.#activeElement);
        }
    }
}