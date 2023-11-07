import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './ar360/components/notfound/notfound.component';
import { ProductService } from './ar360/service/product.service';
import { CountryService } from './ar360/service/country.service';
import { CustomerService } from './ar360/service/customer.service';
import { EventService } from './ar360/service/event.service';
import { IconService } from './ar360/service/icon.service';
import { NodeService } from './ar360/service/node.service';
import { PhotoService } from './ar360/service/photo.service';
import { QbConfigComponent } from './ar360/components/qb-config/qb-config.component';

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent, QbConfigComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
