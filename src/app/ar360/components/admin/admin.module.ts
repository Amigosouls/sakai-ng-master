import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { QbConfigComponent } from './qb-config/qb-config.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from "primeng/calendar";
import { CompanyComponent } from './company/company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { TermsComponent } from './terms/terms.component';
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { TermsPaymentViewComponent } from './terms-payment-view/terms-payment-view.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [
    QbConfigComponent,
    CompanyComponent,
    TermsComponent,
    PaymentMethodsComponent,
    TermsPaymentViewComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    InputTextModule,
    InputSwitchModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
    TableModule,
    ButtonModule,
    DialogModule,
    SelectButtonModule,
    ToolbarModule,
    ToastModule,
    FileUploadModule
  ]
})
export class AdminModule { }
