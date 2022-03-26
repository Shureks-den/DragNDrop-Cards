import { Card } from "../Card/card";
import { Grid } from "../Grid/grid";
import { kindaDatabase, peopleCount } from "../utils/constans";
import { getData } from "../utils/getData";


export async function MainPage(root: HTMLDivElement) {
    root.innerHTML = '';
    const gridWrapper = new Grid(<HTMLDivElement> root);
    if (kindaDatabase.length == 0) {
        await getData(kindaDatabase, gridWrapper, peopleCount);
    }
    kindaDatabase.forEach( (people, num) => {
        const card = new Card(people.name, num);
        gridWrapper.appendMoveable(card);
    });
}