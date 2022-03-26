import { Card } from './Card/card';
import { Grid } from './Grid/grid';
import { StarWarsPeople } from './types';

async function getData(baseArr: StarWarsPeople[], grid: Grid, iterCount: number) {
    for (let i = 1; i <= iterCount; i++) {
        const swPeople = await fetch(`https://swapi.dev/api/people/${i}/`);
        const data = await swPeople.json();
        baseArr.push(<StarWarsPeople> data);
    }
}

const kindaDatabase = <StarWarsPeople[]> [];

const root = document.getElementById('root');

async function MainPage(root: HTMLDivElement) {
    root.innerHTML = '';
    const gridWrapper = new Grid(<HTMLDivElement> root);
    if (kindaDatabase.length == 0) {
        await getData(kindaDatabase, gridWrapper, 10);
    }
    kindaDatabase.forEach( (people, num) => {
        const card = new Card(people.name, num);
        gridWrapper.appendMoveable(card);
    });
}

function PersonalPage(id: number, root: HTMLDivElement) {
    root.innerHTML = '';
    const backBtn = document.createElement('a');
    backBtn.href = 'back';
    backBtn.innerHTML = 'Back to Grid';
    backBtn.setAttribute('dataset', 'MainPage');
    root.appendChild(backBtn);
    const info = document.createElement('div');
    info.innerHTML = JSON.stringify(kindaDatabase[id]);
    root.appendChild(info);
}
MainPage(<HTMLDivElement> root);


document.addEventListener('click', (e) => {
    if (e.target instanceof HTMLAnchorElement) {
        e.preventDefault();
        const action = e.target.getAttribute('dataset');
        console.log(e.target)
        switch (action) {
            case 'PersonalPage':
                const id = Number(e.target.getAttribute('dataid'));
                PersonalPage(id, <HTMLDivElement> root);
                break;

            case 'MainPage':
                MainPage(<HTMLDivElement> root);
                break;

            default:
                break;
        }
    }
})

