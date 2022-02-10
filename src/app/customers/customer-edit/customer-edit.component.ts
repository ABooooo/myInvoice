import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from "../../../environments/environment";

import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html'
})
export class CustomerEditComponent implements OnInit {
  customersData = [];
  selectedCustomerId = null;
  editCustomer = false;
  editCustomerForm: FormGroup;
  showSuccessAlert = false;
  showErrorAlert = false;
  showEditSuccessAlert = false;
  showEditErrorAlert = false;
  isLoading = false;

  // select to clear on delete
  @ViewChild(NgSelectComponent) customerSelect: NgSelectComponent;

  constructor(private http: HttpClient, private modalService: NgbModal) { }

  ngOnInit(): void {
      this.getCustomers();
  }

  private getCustomers() {
    this.http
      .get(environment.firebaseUrl + '/customers.json')
      .pipe(map(responseData => {
        const customerArray = [];
        for (const key in responseData) {
          if(responseData.hasOwnProperty(key)) {
            customerArray.push({...responseData[key], id: key});
          }
        }
        this.customersData = customerArray;
      }))
      .subscribe(() => {
        this.isLoading = false;
      });
    };

    onEditCustomer() {
      this.http
        .get(environment.firebaseUrl + '/customers/' + this.selectedCustomerId + '.json')
        .subscribe(responseData => {
          const customerData = JSON.parse(JSON.stringify(responseData));
          let currentCompany = customerData.company;
          let currentExtended = customerData.extended;
          let currentAddress = customerData.address;
          let currentPost = customerData.post;
          let currentTax = customerData.tax;

          this.editCustomerForm = new FormGroup({
            'company': new FormControl(currentCompany),
            'extended': new FormControl(currentExtended),
            'address': new FormControl(currentAddress),
            'post': new FormControl(currentPost),
            'tax': new FormControl(currentTax)
          })

          this.editCustomer = true;
        });
    }

    onSaveCustomerData() {
      const customerData = JSON.parse(JSON.stringify(this.editCustomerForm.value));
          let newCompany = customerData.company;
          let newExtended = customerData.extended;
          let newAddress = customerData.address;
          let newPost = customerData.post;
          let newTax = customerData.tax;

      if (this.selectedCustomerId !== null) {
      this.http
        .patch(environment.firebaseUrl + '/customers/' + this.selectedCustomerId + '.json', {
          company: newCompany,
          extended: newExtended,
          address: newAddress,
          post: newPost,
          tax: newTax
        })
        .subscribe();

        this.editCustomerForm.reset();
        this.selectedCustomerId = '';
        this.customerSelect.handleClearClick();
        this.showEditSuccessAlert = true;
        setTimeout (() => {
          this.showEditSuccessAlert= false;
        }, 2500);

      } else {
        this.showEditErrorAlert = true;
      }
    }

    onCancelCustomerEdit() {
      this.editCustomerForm.reset();
      this.editCustomer = false;
    }

    openModalDelete() {
      const modalRef = this.modalService.open(ModalDeleteComponent);
      // send some value to modal
      modalRef.componentInstance.customerId = this.selectedCustomerId;
      // get value when modal is closed
      modalRef.result.then(result => {
        if (result === true) {
          this.showSuccessAlert = true;
          this.customerSelect.handleClearClick();
          setTimeout (() => {
            this.showSuccessAlert= false;
          }, 3000);
        } else if (result === false) {
          this.showErrorAlert = true;
        }
      })
    }

    dismissSuccessAlertBox() {
      this.showSuccessAlert = false;
    }

    dismissEditSuccessAlertBox() {
      this.showEditSuccessAlert = false;
    }

    dismissEditErrorAlertBox() {
      this.showEditErrorAlert = false;
    }

    reloadCustomers() {
      this.getCustomers();
      this.isLoading = true;
    }
}
