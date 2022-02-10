import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.componenet';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceNewComponent } from './invoice/invoice-new/invoice-new.component';
import { InvoiceOverviewComponent } from './invoice/invoice-overview/invoice-overview.component';
import { InvoiceItemComponent } from './invoice/invoice-overview/invoice-item/invoice-item.component';
import { InvoiceService } from './invoice/invoice.service';
import { HeaderDataService } from './invoice/invoiceHeader.service';
import { CustomersComponent } from './customers/customers.component';
import { AppRoutingModule } from './app-routing.module';
import { CustomerNewComponent } from './customers/customer-new/customer-new.component';
import { CustomerEditComponent } from './customers/customer-edit/customer-edit.component';
import { ModalDeleteComponent } from './customers/customer-edit/modal-delete/modal-delete.component';
import { AuthComponent } from './auth/auth.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { LoaderButtonComponent } from './shared/loader-button/loader-button.component';
import { registerLocaleData } from '@angular/common';

import localeDe from '@angular/common/locales/de';
registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InvoiceComponent,
    InvoiceNewComponent,
    InvoiceOverviewComponent,
    InvoiceItemComponent,
    CustomersComponent,
    CustomerNewComponent,
    CustomerEditComponent,
    ModalDeleteComponent,
    AuthComponent,
    LoaderComponent,
    LoaderButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    NgbModule,
    AppRoutingModule
  ],
  // add services to provider if they have to be accesseble globaly
  providers: [
    InvoiceService,
    HeaderDataService,
    [{ provide: LOCALE_ID, useValue: 'en-EN'}],
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
