import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Service } from 'src/app/shared/services.model';
import { InvoiceService } from '../invoice.service';

import { HeaderDataModel } from 'src/app/shared/headerData.model';
import { HeaderDataService } from '../invoiceHeader.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-invoice-new',
  templateUrl: './invoice-new.component.html'
})
export class InvoiceNewComponent implements OnInit {
  firebaseUrl = 'your firebase project url';
  customersData = [];
  selectedCustomerId = null;
  selectedCustomerData: {};
  showErrorAlert = false;
  showSubmitErrorAlert = false;
  submitErrorAlertText = '';

  // get DOM elements for invoice header
  @ViewChild('invNumberInput', { static: false}) invNumberInputRef: ElementRef;
  @ViewChild('isAbroadInput', { static: false}) isAbroadInputRef: ElementRef;

  // get DOM elements for new invoice item
  @ViewChild('activityInput', { static: false}) activityInputRef: ElementRef;
  @ViewChild('hoursInput', { static: false}) hoursInputRef: ElementRef;
  @ViewChild('isFlatRateInput', { static: false}) isFlatRateInputRef: ElementRef;
  @ViewChild('flatRateInput', { static: false}) flatRateInputRef: ElementRef;
  @ViewChild('hourRateInput', { static: false}) hourRateInputRef: ElementRef;

  // checkbox databinding
  isFlatRate = false;

  // connect with service
  constructor(
    private invService: InvoiceService,
    private headerDataService: HeaderDataService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getCustomers();

    // call listener if service was edited
    this.invService.servicesEdit
      .subscribe(
        (service: Service[]) => {
          console.log("overview data", service)
          this.activityInputRef.nativeElement.value = service[0].activity;
          this.hourRateInputRef.nativeElement.value = service[0].hourRate;

          if (service[0].isFlatRate) {
            this.isFlatRate = true;
            this.isFlatRateInputRef.nativeElement.checked = service[0].isFlatRate;
            this.flatRateInputRef.nativeElement.value = service[0].flatRate;
          } else {
            this.hoursInputRef.nativeElement.value = service[0].hours;
          }
        }
      );
  }

  private getCustomers() {
    this.http
      .get(this.firebaseUrl + '/customers.json')
      .pipe(map(responseData => {
        const customerArray = [];
        for (const key in responseData) {
          if(responseData.hasOwnProperty(key)) {
            customerArray.push({...responseData[key], id: key});
          }
        }
        this.customersData = customerArray;
      }))
      .subscribe();
    };

  getCustomerById() {
    return this.http
    .get(this.firebaseUrl + '/customers/' + this.selectedCustomerId + '.json')
    .subscribe(responseData => {
      const customerData = JSON.parse(JSON.stringify(responseData));
      this.selectedCustomerData = customerData;
      this.customerChanged();
      });
  }

  onAddActivity() {
    if (this.isFlatRateInputRef.nativeElement.checked) {
      if (!this.activityInputRef.nativeElement.value || !this.flatRateInputRef.nativeElement.value) {
        this.submitErrorAlertText = 'Position and/or Flat rate fields cannot be empty!';
        this.showSubmitErrorAlert = true;
      } else {
        // send values to service
        const activityName = this.activityInputRef.nativeElement.value;
        const hoursAmount = this.hoursInputRef.nativeElement.value;
        const isFlatRateStatus = this.isFlatRateInputRef.nativeElement.checked;
        const flatRateAmount = this.flatRateInputRef.nativeElement.value;
        const hourRateAmount = this.hourRateInputRef.nativeElement.value;
        const newService = new Service(activityName, hoursAmount, isFlatRateStatus, flatRateAmount, hourRateAmount);
        this.invService.addService(newService);

        this.activityInputRef.nativeElement.value = '';
        this.hoursInputRef.nativeElement.value = '';
        this.isFlatRateInputRef.nativeElement.checked = false;
        this.flatRateInputRef.nativeElement.value = '';
        this.isFlatRate = false;
      }
    } else {
      if (!this.activityInputRef.nativeElement.value || !this.hoursInputRef.nativeElement.value) {
        this.submitErrorAlertText = 'Position and/or Hours fields cannot be empty!';
        this.showSubmitErrorAlert = true;
      } else {
        // send values to service
        const activityName = this.activityInputRef.nativeElement.value;
        const hoursAmount = this.hoursInputRef.nativeElement.value;
        const isFlatRateStatus = this.isFlatRateInputRef.nativeElement.checked;
        const flatRateAmount = this.flatRateInputRef.nativeElement.value;
        const hourRateAmount = this.hourRateInputRef.nativeElement.value;
        const newService = new Service(activityName, hoursAmount, isFlatRateStatus, flatRateAmount, hourRateAmount);
        this.invService.addService(newService);

        this.activityInputRef.nativeElement.value = '';
        this.hoursInputRef.nativeElement.value = '';
        this.isFlatRateInputRef.nativeElement.checked = false;
        this.flatRateInputRef.nativeElement.value = '';
        this.isFlatRate = false;
      }
    }
  }

  onFlatRateChanged(value:boolean){
    this.isFlatRate = value;

    if (value) {
      // if true then empty hours
      this.hoursInputRef.nativeElement.value = '';
    } else {
      // if false then empty the flat rate
      this.flatRateInputRef.nativeElement.value = '';
    }
  }

  onGeneratePDF() {
    if (!this.selectedCustomerData || !this.invNumberInputRef.nativeElement.value) {
      this.showErrorAlert = true;
    } else {
      window.print();
    }
  }

  customerChanged() {
    const customer = this.selectedCustomerData;
    const invNumber = this.invNumberInputRef.nativeElement.value;
    const isAbroad = this.isAbroadInputRef.nativeElement.checked;
    const newData = new HeaderDataModel(customer, invNumber, isAbroad);
    this.headerDataService.addHeaderData(newData);
  }

  invNumberChanged(value:any) {
    let customer: any = '';
    if (this.selectedCustomerData) {
      customer = this.selectedCustomerData;
    }
    const invNumber = value;
    const isAbroad = this.isAbroadInputRef.nativeElement.checked;
    const newData = new HeaderDataModel(customer, invNumber, isAbroad);
    this.headerDataService.addHeaderData(newData);
  }

  isAbroadChanged(value:boolean) {
    let customer: any = '';
    if (this.selectedCustomerData) {
      customer = this.selectedCustomerData;
    }
    const invNumber = this.invNumberInputRef.nativeElement.value;
    const isAbroad = value;
    const newData = new HeaderDataModel(customer, invNumber, isAbroad);
    this.headerDataService.addHeaderData(newData);
  }

  onResetAll() {
    location.reload();
  }

  dismissErrorAlertBox() {
    this.showErrorAlert = false;
  }

  dismissSubmitErrorAlertBox() {
    this.showSubmitErrorAlert = false;
  }

}
