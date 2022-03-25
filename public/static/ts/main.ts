import { Card } from './Card/card';
import { Grid } from './Grid/grid';
import { StarWarsPeople } from './types';

async function getData(baseArr: StarWarsPeople[], grid: Grid, iterCount: number) {
    for (let i = 1; i <= iterCount; i++) {
        const swPeople = await fetch(`https://swapi.dev/api/people/${i}/`);
        const data = await swPeople.json();
        baseArr.push(<StarWarsPeople> data);
    }
    console.log(baseArr);
    baseArr.forEach(people => {
        const card = new Card(people.name);
        grid.appendMoveable(card);
    });
}

const kindaDatabase = <StarWarsPeople[]> [];

const root = document.getElementById('root');
const gridWrapper = new Grid(<HTMLDivElement> root);

getData(kindaDatabase, gridWrapper, 7);
