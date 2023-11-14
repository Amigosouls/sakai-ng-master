import { Component, OnInit } from '@angular/core';
import { dA } from '@fullcalendar/core/internal-common';
import { MessageService } from 'primeng/api';
import { Terms_Payment } from 'src/app/ar360/api/terms-payment';
import { TermsPaymentService } from 'src/app/ar360/service/terms-payment.service';

@Component({
    selector: 'app-terms',
    templateUrl: './terms.component.html',
    styleUrls: ['./terms.component.scss'],
})
export class TermsComponent implements OnInit {
   constructor(private termsPaymentService:TermsPaymentService){}
   termsData : Terms_Payment[] = [] ;
    componentName:string="Terms";
   ngOnInit(): void {
        this.termsPaymentService.getTerms().then(data=>{this.termsData=data});
    }
}