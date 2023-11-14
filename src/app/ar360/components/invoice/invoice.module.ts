import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { GenerateInvoiceComponent } from './generate-invoice/generate-invoice.component';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    GenerateInvoiceComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    ToastModule,
    FileUploadModule,
    InputTextareaModule,
    InputNumberModule,
    InputTextModule,
    CalendarModule
  ]
})
export class InvoiceModule { }
