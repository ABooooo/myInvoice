import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from "../../../environments/environment";


@Component({
  selector: 'app-customer-new',
  templateUrl: './customer-new.component.html'
})
export class CustomerNewComponent implements OnInit {
  showSuccessAlert = false;
  formErrorMessage = false;
  errorMessage = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onNewCustomer(postData: { company: string; extended: string; address: string;  post: string; tax: string;}, form: NgForm) {
    if (postData.company !== '' && postData.address !== '' && postData.post !== '') {
      // Send Http request
      this.http
      .post(
        environment.firebaseUrl + '/customers.json',
        postData
      )
      .subscribe(responseData => {
        this.showSuccessAlert = true;
      }, error => {
        this.errorMessage = error.message;
      });

      form.reset();

      setTimeout (() => {
        this.showSuccessAlert= false;
      }, 3000);
    } else {
      this.formErrorMessage = true;
    }
  };

  dismissForErrorAlertBox() {
    this.formErrorMessage = false;
  }

  dismissAlertBox() {
    this.showSuccessAlert = false;
  }

}
