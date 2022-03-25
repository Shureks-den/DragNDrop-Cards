export class MoveAble {
    protected moveable: HTMLDivElement
    constructor() {
        this.moveable = document.createElement('div');
    }

    get obj(): HTMLDivElement {
        return this.moveable;
    }
}

