import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Terms_Payment } from 'src/app/ar360/api/terms-payment';
import { TermsPaymentService } from 'src/app/ar360/service/terms-payment.service';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss']
})
export class PaymentMethodsComponent implements OnInit {
  paymentData:Terms_Payment[]=[];
  public componentName:string = "Payment Methods"
  constructor(private termsPaymentService:TermsPaymentService){}
  ngOnInit(): void {
    this.termsPaymentService.getPaymentMethods().then(data => this.paymentData = data);
  }
}
