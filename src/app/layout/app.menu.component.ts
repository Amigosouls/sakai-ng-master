import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
                ]
            },
            {
                label: 'Settings',
                items: [
                    { label: 'QB Config', icon: 'pi pi-fw pi-eye', routerLink: ['/admin/qbConfig'], badge: 'NEW' },
                    { label: 'Company', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
                    { label: 'Terms', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
                    { label: 'Payment Methods', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
                ]
            }
        ];
    }
}
