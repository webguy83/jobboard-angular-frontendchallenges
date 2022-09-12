import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./job-search/job-search.module').then((m) => m.JobSearchModule),
  },
  {
    path: 'detail',
    component: DetailComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
