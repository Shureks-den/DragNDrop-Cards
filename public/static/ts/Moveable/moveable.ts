export class MoveAble {
    protected moveable: HTMLDivElement
    constructor() {
        this.moveable = document.createElement('div');
        this.moveable.addEventListener('mouseover', () => {
            this.moveable.draggable = true;
        })
        this.moveable.addEventListener('dragstart', ()=>{
            this.moveable.classList.add('dragable');
        });
        this.moveable.addEventListener('mouseout', () => {
            this.moveable.draggable = false;
        })
        this.moveable.addEventListener('dragend', ()=>{
            this.moveable.classList.remove('dragable');
        });
    }

    get card(): HTMLDivElement {
        return this.moveable;
    }
}

