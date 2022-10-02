import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./job-search/job-search.module').then((m) => m.JobSearchModule),
  },
  {
    path: 'detail',
    loadChildren: () =>
      import('./detail-view/detail-view.module').then(
        (m) => m.DetailViewModule
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
