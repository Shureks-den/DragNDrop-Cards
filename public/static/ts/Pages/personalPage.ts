import { StarWarsPeople } from "../types";
import { kindaDatabase } from "../utils/constans";

export function PersonalPage(id: number, root: HTMLDivElement) {
    root.innerHTML = '';
    const data = kindaDatabase[id];
    const backBtn = document.createElement('a');
    backBtn.href = 'back';
    backBtn.innerHTML = 'Back to Grid';
    backBtn.setAttribute('dataset', 'MainPage');
    root.appendChild(backBtn);
    const info = document.createElement('div');
    info.classList.add('info-block');

    const name = document.createElement('p');
    name.classList.add('info-name');
    name.innerHTML = data.name;
    info.appendChild(name);

    const mainInfo = document.createElement('p');
    mainInfo.classList.add('.info-mainText');
    mainInfo.innerHTML = 'Main Info:'
    info.appendChild(mainInfo);

    for (let key in data) {
        if (key === 'name') {
            continue;
        } else if (key === 'homeworld') {
            break;
        }
        const infoField = document.createElement('p');
        infoField.innerHTML = `${key} : ${(data as any)[key]}`;
        info.appendChild(infoField);
        
    }

    root.appendChild(info);
}