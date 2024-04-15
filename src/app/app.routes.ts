import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component'),
        children: [
            {
                path: 'search-flight',
                title: 'Search Flight',
                loadComponent: () => import('./dashboard/pages/search-flight/search-flight.component'),
            },
            {
                path: 'load-flight',
                title: 'Load Flight',
                loadComponent: () => import('./dashboard/pages/load-flight/load-flight.component'),
            },

            {
                path: '', redirectTo: 'search-flight', pathMatch: 'full',
            }
        ]
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }



];
