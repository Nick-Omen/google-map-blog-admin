import { Routes } from '@angular/router';
import { PlacesComponent } from './places.component';
import { DetailsComponent } from './details/details.component';

export const placesRoutes: Routes = [
  {
    path: 'places',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: PlacesComponent
      },
      {
        path: ':id',
        component: DetailsComponent
      },
    ]
  },
];
