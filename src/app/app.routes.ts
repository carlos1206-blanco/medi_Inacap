
import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { ReservaForm } from './components/reserva-form/reserva-form';
import { ReservaList } from './components/reserva-list/reserva-list';
import { About } from './components/about/about';
export const routes: Routes = [
    {
        path: '',
        component: Login,
    },
    {
        path: 'reserva',
        component: ReservaForm,
    }, 
    {
        path: 'reservaList',
        component: ReservaList,
    },
    {
        path: 'about',
        component: About,
    },
];