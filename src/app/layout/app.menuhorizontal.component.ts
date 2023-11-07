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
              { label: 'QB Config', icon: 'pi pi-fw pi-eye', routerLink: ['/dashboard/qbConfig']},
              { label: 'Company', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'] },
              { label: 'Terms', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks']},
              { label: 'Payment Methods', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks']},
          ]
      }
      ]
    }
}
