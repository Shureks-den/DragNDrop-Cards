export class MoveAble {
    protected moveable: HTMLDivElement
    constructor() {
        this.moveable = document.createElement('div');
        this.moveable.addEventListener('dragend', (e) => {
            this.moveable.classList.remove('dragable');
        });
    }

    get obj(): HTMLDivElement {
        return this.moveable;
    }
}

