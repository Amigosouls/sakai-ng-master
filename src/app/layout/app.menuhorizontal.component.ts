import { Component,OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menuhorizontal',
  templateUrl: './app.menuhorizontal.component.html'
})
export class AppMenuhorizontalComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
      this.items = [
        {
          label: 'Home',
          icon: 'pi pi-fw pi-home',
          items: [
              { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
          ]
      },
      {
          label: 'Settings',
          icon: 'pi pi-fw pi-cog',
          items: [
              { label: 'QB Config', icon: 'pi pi-fw pi-database', routerLink: ['/admin/qbconfig']},
              { label: 'Company', icon: 'pi pi-fw pi-building', routerLink: ['/admin/company'] },
              { label: 'Terms', icon: 'pi pi-fw pi-book', routerLink: ['/admin/terms']},
              { label: 'Payment Methods', icon: 'pi pi-fw pi-money-bill', routerLink: ['/admin/payments']},
          ]
      },
      {
        label: 'Invoice',
        icon: 'pi pi-fw pi-file',
        items: [
            { label: 'Generate Invoice', icon: 'pi pi-fw pi-clone', routerLink: ['/invoice/generate'] },
        ]
    }
      ]
    }
}
