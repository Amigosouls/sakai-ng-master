import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Terms_Payment } from '../api/terms-payment';

@Injectable({
  providedIn: 'root'
})
export class TermsPaymentService {

  constructor(private httpClient:HttpClient) {}

  getPaymentMethods(){
    return this.httpClient.get<any>('assets/ar360/data/payments.json')
            .toPromise()
            .then(res => res.data as Terms_Payment[])
            .then(data => data);
  }
  getTerms(){
    return this.httpClient.get<any>('assets/ar360/data/terms.json')
            .toPromise()
            .then(res => res.data as Terms_Payment[])
            .then(data => data);
  }
}
