export interface InvoiceForm {
    invoiceHeaderForm: InvoiceHeaderForm;
    invoiceFooterForm: InvoiceFooterForm;
    lineItemForm: LineItemForm;
  }
  interface LineItemForm {
    lineItem: LineItem[];
  }
  interface LineItem {
    description: string;
    quantity: string;
    rate: string;
    amount: string;
  }
  interface InvoiceFooterForm {
    notes: string;
    terms: string;
    subTotal: string;
    tax: string;
    shippingCharges: string;
    discount: string;
    total: string;
    amountPaid: string;
    balanceDue: string;
  }
  interface InvoiceHeaderForm {
    invoiceNo: number;
    invoiceDate: string;
    paymentTerms: string;
    dueDate: string;
    poNumber: string;
    companyLogo: string;
    invoiceFrom: string;
    billedTo: string;
    shippedTo: string;
  }