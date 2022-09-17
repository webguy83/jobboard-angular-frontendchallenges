import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailMainComponent } from './detail-main/detail-main.component';
import { DetailViewRoutingModule } from './detail-view-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DetailHeaderComponent } from './detail-header/detail-header.component';

@NgModule({
  declarations: [DetailMainComponent, DetailHeaderComponent],
  imports: [CommonModule, DetailViewRoutingModule, SharedModule],
})
export class DetailViewModule {}
