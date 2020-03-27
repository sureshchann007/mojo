import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { DashboardRoutes } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  imports: [
    CommonModule,    
    MaterialModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
