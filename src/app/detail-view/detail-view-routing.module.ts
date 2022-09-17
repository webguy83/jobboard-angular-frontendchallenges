import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobResolver } from '../services/job.resolver';
import { DetailMainComponent } from './detail-main/detail-main.component';

const routes: Routes = [
  {
    path: ':id',
    component: DetailMainComponent,
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
