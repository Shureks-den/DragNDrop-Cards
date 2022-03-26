import { kindaDatabase } from "../utils/constans";

export function PersonalPage(id: number, root: HTMLDivElement) {
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