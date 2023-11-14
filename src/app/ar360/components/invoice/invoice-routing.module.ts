import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateInvoiceComponent } from './generate-invoice/generate-invoice.component';

const routes: Routes = [
  {path:'generate', component:GenerateInvoiceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
