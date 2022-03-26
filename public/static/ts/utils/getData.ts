import { StarWarsPeople } from "../types";
import { Grid } from '../Grid/grid'

export async function getData(baseArr: StarWarsPeople[], grid: Grid, iterCount: number) {
    for (let i = 1; i <= iterCount; i++) {
        const swPeople = await fetch(`https://swapi.dev/api/people/${i}/`);
        const data = await swPeople.json();
        baseArr.push(<StarWarsPeople> data);
    }
}