import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UploadEvent } from 'primeng/fileupload';
import { Toast } from 'primeng/toast';
import jspdf from 'jspdf'
import html2canvas from 'html2canvas';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-generate-invoice',
  templateUrl: './generate-invoice.component.html',
  styleUrls: ['./generate-invoice.component.scss']
})
export class GenerateInvoiceComponent implements OnInit {
  invoiceForm!: FormGroup;
  uploadedFiles: any[] = [];
  y=0;
  visible:boolean=false;
  invoiceCount:number=localStorage.length;
  storedFormData:any;
  constructor(private messageService: MessageService, private fb: FormBuilder, private router:Router,private route: ActivatedRoute) {
    
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
    this.invoiceHeaderForm.get('invoiceNo')?.setValue(this.invoiceCount+1);
    this.route.queryParams.subscribe(params=>{
      console.log(params);
      console.log(localStorage.getItem(params['invoice']))
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
    this.invoiceFooterForm.get('total')?.setValue(total);
      this.invoiceFooterForm.get('balanceDue')?.setValue(total);
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
    doc.text('From:', 20, 60);
    doc.text(formValue.value.invoiceHeaderForm.invoiceFrom.toString(), 80, 60);
    doc.text('Billed To:', 20, 90);
    doc.text(formValue.value.invoiceHeaderForm.billedTo.toString(), 80, 90);
    doc.text('Shipped To:', 20, 120);
    doc.text(formValue.value.invoiceHeaderForm.shippedTo.toString(), 80, 120);
    doc.text('Generated On:', 275, 70);
    doc.text(new Date(formValue.value.invoiceHeaderForm.invoiceDate).toLocaleDateString().toString(), 350, 70);
    doc.text('Payment Terms:', 275, 80);
    doc.text(formValue.value.invoiceHeaderForm.paymentTerms.toString(), 350, 80);
    doc.text('Due Date:', 275, 90);
    doc.text(new Date(formValue.value.invoiceHeaderForm.dueDate).toLocaleDateString().toString(), 350, 90);
    doc.text('PO Number:', 275, 100);
    doc.text(formValue.value.invoiceHeaderForm.poNumber.toString(), 350, 100);
    doc.setFillColor('black');
    doc.rect(0, 200, 595, 15, 'F');
    doc.setTextColor('white');
    doc.text('Description:', 10, 208);
    doc.text('Quantity:', 270, 208);
    doc.text('Rate:', 350, 208);
    doc.text('Amount:', 400, 208);
    doc.setTextColor('black');
    if (this.lineItemForm.valid) {
      this.y=215;
      let height = this.y;
      for (const control of this.lineItem.controls) {
        height=height+10;
        doc.text(control.value.description.toString(), 10, height);
        doc.text(control.value.quantity.toString(), 270, height);
        doc.text(control.value.rate.toString(), 350, height);
        doc.text(control.value.amount.toString(), 400, height);
        if(height>732){
          doc.addPage();
          height=0;
          this.y=0;
          
        }
      }
      this.y=height;
    }
    doc.line(280,290,280,430);
    doc.text('Notes:',20,300);
    doc.text(formValue.value.invoiceFooterForm.notes.toString(), 50, 300);
    doc.text('Terms:',20,350);
    doc.text(formValue.value.invoiceFooterForm.terms.toString(), 50, 350);
    doc.text('SubTotal:',300,300);
    doc.text(formValue.value.invoiceFooterForm.subTotal.toString(), 370, 300);
    doc.text('Tax:',300,320);
    doc.text(`+${formValue.value.invoiceFooterForm.tax.toString()==""? 'NIL':formValue.value.invoiceFooterForm.tax.toString()}$`, 370, 320);
    doc.text('Shipping:',300,340);
    doc.text(`+${formValue.value.invoiceFooterForm.shippingCharges.toString()==""? 'NIL':formValue.value.invoiceFooterForm.shippingCharges.toString()}$`, 370, 340);
    doc.text('Discount:',300,360);
    doc.text(`-${formValue.value.invoiceFooterForm.discount.toString()==""? 'NIL':formValue.value.invoiceFooterForm.discount.toString()}$`, 370, 360);
    doc.text('Total:',300,380);
    doc.text(`${formValue.value.invoiceFooterForm.total.toString()==""? 'NIL':formValue.value.invoiceFooterForm.total.toString()}$`, 370, 380);
    doc.text('Amount Paid:',300,400);
    doc.text(`-${formValue.value.invoiceFooterForm.amountPaid.toString()==""? 'NIL':formValue.value.invoiceFooterForm.amountPaid.toString()}$`, 370, 400);
    doc.text('Balance Due:',300,420);
    doc.text(`${formValue.value.invoiceFooterForm.balanceDue.toString()}$`, 370, 420);
    doc.save('document.pdf');
    localStorage.setItem(`invoice-${this.invoiceCount+1}`,JSON.stringify(this.invoiceForm.value));
    this.router.navigate([`/invoice/post-generate/invoice-${this.invoiceCount+1}`]);
  };


  calculateAmount() {
    if (this.invoiceFooterForm.get('tax')?.value === "" && this.invoiceFooterForm.get('shippingCharges')?.value === "" && this.invoiceFooterForm.get('discount')?.value === "" &&this.invoiceFooterForm.get('subTotal')?.value === "") {
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

  showDownloadDialog() {
    this.visible = true;
  }
}
