import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateInvoiceComponent } from './generate-invoice/generate-invoice.component';
import { PostInvoiceGenerationComponent } from './post-invoice-generation/post-invoice-generation.component';

const routes: Routes = [
  {path:'generate', component:GenerateInvoiceComponent},
  {path:'post-generate/:id', component:PostInvoiceGenerationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
