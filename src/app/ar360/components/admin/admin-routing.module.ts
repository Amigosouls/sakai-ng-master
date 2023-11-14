import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QbConfigComponent } from './qb-config/qb-config.component';
import { CompanyComponent } from './company/company.component';
import { TermsComponent } from './terms/terms.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';

const routes: Routes = [
  {path:"qbconfig", component:QbConfigComponent},
  {path:"company",component:CompanyComponent},
  {path:"terms",component:TermsComponent},
  {path:"payments",component:PaymentMethodsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
