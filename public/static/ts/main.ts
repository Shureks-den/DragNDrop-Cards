import { MainPage } from './Pages/mainPage';
import { PersonalPage } from './Pages/personalPage';

document.addEventListener('click', (e) => {
    if (e.target instanceof HTMLAnchorElement) {
        e.preventDefault();
        const action = e.target.getAttribute('dataset');
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
});

const root = document.getElementById('root');
MainPage(<HTMLDivElement> root);


