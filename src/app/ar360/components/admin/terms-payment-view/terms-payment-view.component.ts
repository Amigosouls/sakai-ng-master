import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Terms_Payment } from 'src/app/ar360/api/terms-payment';

@Component({
  selector: 'app-terms-payment-view',
  templateUrl: './terms-payment-view.component.html',
  styleUrls: ['./terms-payment-view.component.scss']
})

export class TermsPaymentViewComponent implements OnInit {  
  @Input() termsPayment:Terms_Payment[]=[];
  @Input() componentName:string=''
  productDialog: boolean = false;
      deleteProductDialog: boolean = false;
      routeName:string=""
      deleteProductsDialog: boolean = false;
  
      terms:Terms_Payment[]=[];
      termPayment:Terms_Payment={}
  
      selectedTermsPayments: Terms_Payment[] = [];
  
      submitted: boolean = false;
  
      cols: any[] = [];
  
      statuses: any[] = [];
  
      rowsPerPageOptions = [5, 10, 20];
  
      constructor( private messageService: MessageService, private router:ActivatedRoute) { }

      ngOnInit() {
          this.cols = [
              { field: 'name', header: 'Name' },
              { field: 'status', header: 'Status' },
              
          ];
      }
  
      openNew() {
          this.termPayment = {};
          this.submitted = false;
          this.productDialog = true;
      }
  
      deleteSelectedProducts() {
          this.deleteProductsDialog = true;
      }
  
      editProduct(termsPayment: Terms_Payment) {
          this.termPayment = { ...termsPayment };
          this.productDialog = true;
      }
  
      deleteProduct(termsPayment: Terms_Payment) {
          this.deleteProductDialog = true;
          this.termPayment = { ...termsPayment };
      }
  
      confirmDeleteSelected() {
          this.deleteProductsDialog = false;
          this.termsPayment = this.termsPayment.filter(val => !this.selectedTermsPayments.includes(val));
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
          this.selectedTermsPayments = [];
      }
  
      confirmDelete() {
          this.deleteProductDialog = false;
          this.termsPayment = this.termsPayment.filter(val => val.name !== this.termPayment.name);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
          this.termPayment = {};
      }
  
      hideDialog() {
          this.productDialog = false;
          this.submitted = false;
      }
  
      // saveProduct() {
      //     this.submitted = true;
  
      //     if (this.termPayment.name?.trim()) {
      //         if (this.product.id) {
      //             // @ts-ignore
      //             this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
      //             this.products[this.findIndexById(this.product.id)] = this.product;
      //             this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      //         } else {
      //             this.product.id = this.createId();
      //             this.product.code = this.createId();
      //             this.product.image = 'product-placeholder.svg';
      //             // @ts-ignore
      //             this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
      //             this.products.push(this.product);
      //             this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      //         }
  
      //         this.products = [...this.products];
      //         this.productDialog = false;
      //         this.product = {};
      //     }
      // }
  
      // findIndexById(id: string): number {
      //     let index = -1;
      //     for (let i = 0; i < this.products.length; i++) {
      //         if (this.products[i].id === id) {
      //             index = i;
      //             break;
      //         }
      //     }
  
      //     return index;
      // }
  
      // createId(): string {
      //     let id = '';
      //     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      //     for (let i = 0; i < 5; i++) {
      //         id += chars.charAt(Math.floor(Math.random() * chars.length));
      //     }
      //     return id;
      // }
  
      onGlobalFilter(table: Table, event: Event) {
          table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
      }


}


  
