import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UploadEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-generate-invoice',
  templateUrl: './generate-invoice.component.html',
  styleUrls: ['./generate-invoice.component.scss']
})
export class GenerateInvoiceComponent{
  lineItemForm !: FormGroup;
  invoiceHeaderForm !:FormGroup;
  invoiceFooterForm !:FormGroup;
  constructor(private messageService: MessageService, private fb:FormBuilder) {
    this.lineItemForm = this.fb.group({
      lineItem: this.fb.array(
        [
          new FormGroup({
            description: new FormControl(''),
            quantity: new FormControl(''),
            rate: new FormControl(''),
            amount: new FormControl('')
          })
        ]
      )
    });
    this.invoiceHeaderForm = this.fb.group({
      invoiceNo: new FormControl(Validators.required),
      invoiceDate: new FormControl(''),
      paymentTerms: new FormControl(''),
      poNumber: new FormControl(''),
      companyLogo: new FormControl(''),
      invoiceForm: new FormControl(Validators.required),
      billedTo: new FormControl(Validators.required),
      shippedTo: new FormControl('')
    });
    this.invoiceFooterForm = this.fb.group({
      notes: new FormControl(''),
      terms: new FormControl(''),
      subtotal: new FormControl(''),
      tax: new FormControl(''),
      shippingCharges: new FormControl(''),
      discount: new FormControl(''),
      total: new FormControl(''),
      amountPaid: new FormControl(''),
      balanceDue: new FormControl('')
    })
  }

  private newLineItem():FormGroup{
    return this.fb.group({
      description: new FormControl(''),
      quantity: new FormControl(''),
      rate: new FormControl(''),
      amount: new FormControl('')
    });
  }

  public get lineItem():FormArray{
    return this.lineItemForm.get('lineItem') as FormArray;
  }

  public addLineItem():void{
    this.lineItem.push(this.newLineItem());
  }

  public removeLineItem(index:number):void{
    this.lineItem.removeAt(index);
  }

  onUpload(event: UploadEvent):void {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
  }
}
