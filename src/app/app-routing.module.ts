import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './ar360/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'dashboard', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./ar360/components/dashboard/dashboard.module').then(m => m.DashboardModule) }
                ]
            },
            {
                path: 'admin', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./ar360/components/admin/admin.module').then(m => m.AdminModule) }
                ]
            },
            {
                path: 'invoice', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./ar360/components/invoice/invoice.module').then(m => m.InvoiceModule) }
                ]
            },
            { path: '', loadChildren: () => import('./ar360/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
