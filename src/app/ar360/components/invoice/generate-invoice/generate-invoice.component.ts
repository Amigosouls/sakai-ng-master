import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UploadEvent } from 'primeng/fileupload';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-generate-invoice',
  templateUrl: './generate-invoice.component.html',
  styleUrls: ['./generate-invoice.component.scss']
})
export class GenerateInvoiceComponent implements OnInit{
  lineItemForm !: FormGroup;
  invoiceHeaderForm !:FormGroup;
  invoiceFooterForm !:FormGroup;
  constructor(private messageService: MessageService, private fb:FormBuilder) {
    
  }
  ngOnInit(): void {
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
      dueDate: new FormControl(''),
      poNumber: new FormControl(''),
      companyLogo: new FormControl(''),
      invoiceFrom: new FormControl('',Validators.required),
      billedTo: new FormControl('',Validators.required),
      shippedTo: new FormControl('')
    });
    this.invoiceFooterForm = this.fb.group({
      notes: new FormControl(''),
      terms: new FormControl(''),
      subTotal: new FormControl(''),
      tax: new FormControl('',[Validators.min(0),Validators.max(100)]),
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

  public calculateSubTotal():number{
    let total=0;
    for (const amount of this.lineItem.controls) {
      total=total+amount.value.amount
    }
    return total;
  }

  setAmount(i:number){
    let total=0;
    this.lineItem.at(i).get('amount')?.setValue(this.lineItem.at(i).get('quantity')?.value * this.lineItem.at(i).get('rate')?.value );
    for (const amount of this.lineItem.controls) {
      total=total+amount.value.amount
    }
    this.invoiceFooterForm.get('subTotal')?.setValue(total);
    this.calculateAmount();
  }
  calculateAmount(){
    if(this.invoiceFooterForm.get('tax')?.value==="" && this.invoiceFooterForm.get('shippingCharges')?.value==="" && this.invoiceFooterForm.get('discount')?.value===""){
      this.invoiceFooterForm.get('total')?.setValue(0);
      this.invoiceFooterForm.get('balanceDue')?.setValue(0);
    }
    else{
      this.invoiceFooterForm.get('total')?.setValue((this.invoiceFooterForm.get('tax')?.value/100)*this.invoiceFooterForm.get('subTotal')?.value +
      this.invoiceFooterForm.get('subTotal')?.value) ;
      if(!(this.invoiceFooterForm.get('shippingCharges')?.value==="" || this.invoiceFooterForm.get('shippingCharges')?.value===null)){
        this.invoiceFooterForm.get('total')?.setValue(this.invoiceFooterForm.get('total')?.value + this.invoiceFooterForm.get('shippingCharges')?.value);
        this.invoiceFooterForm.get('balanceDue')?.setValue(this.invoiceFooterForm.get('total')?.value)
      }
      if(!(this.invoiceFooterForm.get('discount')?.value==="" || this.invoiceFooterForm.get('discount')?.value===null)){
        this.invoiceFooterForm.get('total')?.setValue(this.invoiceFooterForm.get('total')?.value -
        ((this.invoiceFooterForm.get('discount')?.value/100)*this.invoiceFooterForm.get('total')?.value));
        this.invoiceFooterForm.get('balanceDue')?.setValue(this.invoiceFooterForm.get('total')?.value)
      }
      if(!(this.invoiceFooterForm.get('amountPaid')?.value==="" || this.invoiceFooterForm.get('amountPaid')?.value===null)){
        this.invoiceFooterForm.get('balanceDue')?.setValue(this.invoiceFooterForm.get('total')?.value - this.invoiceFooterForm.get('amountPaid')?.value)
      }
    }
  }
}
