import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobResolver } from '../services/job.resolver';
import { DetailComponent } from './detail.component';

const routes: Routes = [
  {
    path: ':id',
    component: DetailComponent,
    resolve: {
      job: JobResolver,
    },
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [JobResolver],
})
export class DetailViewRoutingModule {}
