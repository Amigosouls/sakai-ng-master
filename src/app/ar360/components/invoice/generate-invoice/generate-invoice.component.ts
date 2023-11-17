import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UploadEvent } from 'primeng/fileupload';
import { Toast } from 'primeng/toast';
import jspdf from 'jspdf'
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-generate-invoice',
  templateUrl: './generate-invoice.component.html',
  styleUrls: ['./generate-invoice.component.scss']
})
export class GenerateInvoiceComponent implements OnInit {
  invoiceForm!: FormGroup;
  uploadedFiles: any[] = [];
  y=0;
  constructor(private messageService: MessageService, private fb: FormBuilder) {
    
  }
  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
      invoiceHeaderForm: this.fb.group({
        invoiceNo: new FormControl(Validators.required),
        invoiceDate: new FormControl(''),
        paymentTerms: new FormControl(''),
        dueDate: new FormControl(''),
        poNumber: new FormControl(''),
        companyLogo: new FormControl(''),
        invoiceFrom: new FormControl('', Validators.required),
        billedTo: new FormControl('', Validators.required),
        shippedTo: new FormControl('')
      }),
      invoiceFooterForm: this.fb.group({
        notes: new FormControl(''),
        terms: new FormControl(''),
        subTotal: new FormControl(''),
        tax: new FormControl('', [Validators.min(0), Validators.max(100)]),
        shippingCharges: new FormControl(''),
        discount: new FormControl(''),
        total: new FormControl(''),
        amountPaid: new FormControl(''),
        balanceDue: new FormControl('')
      }),
      lineItemForm: this.fb.group({
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
      })
    });
  }
  private newLineItem(): FormGroup {
    return this.fb.group({
      description: new FormControl(''),
      quantity: new FormControl(''),
      rate: new FormControl(''),
      amount: new FormControl('')
    });
  }

  public get lineItem(): FormArray {
    return this.lineItemForm.get('lineItem') as FormArray;
  }
  public get lineItemForm(): FormGroup {
    return this.invoiceForm.get('lineItemForm') as FormGroup;
  }
  public get invoiceHeaderForm(): FormGroup {
    return this.invoiceForm.get('invoiceHeaderForm') as FormGroup;
  }
  public get invoiceFooterForm(): FormGroup {
    return this.invoiceForm.get('invoiceFooterForm') as FormGroup;
  }
  public addLineItem(): void {
    this.lineItem.push(this.newLineItem());
  }

  public removeLineItem(index: number): void {
    this.lineItem.removeAt(index);
  }

  onUpload(event: any): void {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
  }

  setAmount(i: number) {
    let total = 0;
    this.lineItem.at(i).get('amount')?.setValue(this.lineItem.at(i).get('quantity')?.value * this.lineItem.at(i).get('rate')?.value);
    for (const amount of this.lineItem.controls) {
      total = total + amount.value.amount
    }
    this.invoiceFooterForm.get('subTotal')?.setValue(total);
    this.calculateAmount();
  }

  onDownload(formValue: FormGroup): void {
    var doc = new jspdf('p', 'px', 'a4');
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text('INVOICE FORM', 150, 49);
    doc.setFont("courier", "bold");
    doc.setFontSize(11);
    doc.text('Invoice No:', 275, 60);
    doc.text(formValue.value.invoiceHeaderForm.invoiceNo.toString(), 350, 60);
    doc.text('Generated On:', 275, 70);
    doc.text(new Date(formValue.value.invoiceHeaderForm.invoiceDate).toLocaleDateString().toString(), 350, 70);
    doc.text('Payment Terms:', 275, 80);
    doc.text(formValue.value.invoiceHeaderForm.paymentTerms.toString(), 350, 80);
    doc.text('Due Date:', 275, 90);
    doc.text(new Date(formValue.value.invoiceHeaderForm.dueDate).toLocaleDateString().toString(), 350, 90);
    doc.text('PO Number:', 275, 100);
    doc.text(formValue.value.invoiceHeaderForm.poNumber.toString(), 350, 100);
    doc.setFillColor('black');
    doc.rect(0, 300, 595, 15, 'F');
    doc.setTextColor('white');
    doc.text('Description', 10, 200);
    doc.text('Quantity', 280, 200);
    doc.text('Rate', 360, 200);
    doc.text('Amount', 410, 200);
    doc.setTextColor('black');
    if (this.lineItemForm.valid) {
      this.y=215;
      let height = this.y;
      for (const control of this.lineItem.controls) {
        height=height+10;
        doc.text(control.value.description.toString(), 10, height);
        doc.text(control.value.quantity.toString(), 280, height);
        doc.text(control.value.rate.toString(), 360, height);
        doc.text(control.value.amount.toString(), 410, height);
        if(height>732){
          doc.addPage();
          height=0;
          this.y=0;
          
        }
      }
      this.y=height;
    }
    console.log(this.y);
    doc.save('document.pdf');
  };


  calculateAmount() {
    if (this.invoiceFooterForm.get('tax')?.value === "" && this.invoiceFooterForm.get('shippingCharges')?.value === "" && this.invoiceFooterForm.get('discount')?.value === "") {
      this.invoiceFooterForm.get('total')?.setValue(0);
      this.invoiceFooterForm.get('balanceDue')?.setValue(0);
    }
    else {
      this.invoiceFooterForm.get('total')?.setValue((this.invoiceFooterForm.get('tax')?.value / 100) * this.invoiceFooterForm.get('subTotal')?.value +
        this.invoiceFooterForm.get('subTotal')?.value);
      if (!(this.invoiceFooterForm.get('shippingCharges')?.value === "" || this.invoiceFooterForm.get('shippingCharges')?.value === null)) {
        this.invoiceFooterForm.get('total')?.setValue(this.invoiceFooterForm.get('total')?.value + this.invoiceFooterForm.get('shippingCharges')?.value);
        this.invoiceFooterForm.get('balanceDue')?.setValue(this.invoiceFooterForm.get('total')?.value)
      }
      if (!(this.invoiceFooterForm.get('discount')?.value === "" || this.invoiceFooterForm.get('discount')?.value === null)) {
        this.invoiceFooterForm.get('total')?.setValue(this.invoiceFooterForm.get('total')?.value -
          ((this.invoiceFooterForm.get('discount')?.value / 100) * this.invoiceFooterForm.get('total')?.value));
        this.invoiceFooterForm.get('balanceDue')?.setValue(this.invoiceFooterForm.get('total')?.value)
      }
      if (!(this.invoiceFooterForm.get('amountPaid')?.value === "" || this.invoiceFooterForm.get('amountPaid')?.value === null)) {
        this.invoiceFooterForm.get('balanceDue')?.setValue(this.invoiceFooterForm.get('total')?.value - this.invoiceFooterForm.get('amountPaid')?.value)
      }
    }
  }
}
