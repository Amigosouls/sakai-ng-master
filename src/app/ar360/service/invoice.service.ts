import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { InvoiceForm } from '../api/invoice';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  constructor(private httpClient:HttpClient, private router:Router) { }
  invoiceCount=signal<number>(0);
  getInvoices(){
    return this.httpClient.get<any>('assets/ar360/data/invoice-backup.json')
            .toPromise()
            .then(res => res.data as InvoiceForm[] )
            .then(data => data);
  }

  postInvoice(invoiceData:InvoiceForm){
    
    this.httpClient.post<any>('http://localhost:3000/data',invoiceData).subscribe(
     (res)=>{
      this.router.navigate([`/invoice/post-generate/${res.id}`]);
      this.invoiceCount.set(res.id);
    }
    );
  }

  getInvoicesById(index:number):Observable<InvoiceForm>{
    return this.httpClient.get<InvoiceForm>(`http://localhost:3000/data/${index}`)
  }
}
