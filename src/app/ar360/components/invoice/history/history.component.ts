import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { InvoiceForm } from 'src/app/ar360/api/invoice';
import { InvoiceService } from 'src/app/ar360/service/invoice.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  constructor(private messageService:MessageService, private invoiceService:InvoiceService){}
  invoiceArray:InvoiceForm[]=[];
  public clearLocalStorage():void{
    localStorage.clear();
    this.messageService.add({severity: 'info', summary: 'Info', detail: 'Cache Cleared!' });
  }
  ngOnInit(): void {
    this.invoiceService.getInvoices().then(data=>this.invoiceArray=data);
  }

  public deleteInvoice(index:number):void{
    localStorage.removeItem(`invoice-${index}`);
    this.ngOnInit();
    this.messageService.add({severity: 'info', summary: 'Info', detail: `Invoice-${index} deleted!` });
  }
}
