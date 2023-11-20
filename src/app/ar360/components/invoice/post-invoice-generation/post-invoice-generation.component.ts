import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-post-invoice-generation',
  templateUrl: './post-invoice-generation.component.html',
  styleUrls: ['./post-invoice-generation.component.scss']
})
export class PostInvoiceGenerationComponent implements OnInit {
  constructor(private route:ActivatedRoute, private router:Router){}
  routerParam:string = "";
  ngOnInit(): void {
    this.routerParam = this.route.snapshot.params['id'];
  }
  editInvoice():void{
    this.router.navigate(['/invoice/generate'],{queryParams:{invoice:this.routerParam}});
  }
}
