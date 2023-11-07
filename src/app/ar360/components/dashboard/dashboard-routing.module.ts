import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { QbConfigComponent } from '../qb-config/qb-config.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardComponent },
        {path:'qbConfig', component:QbConfigComponent}
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
