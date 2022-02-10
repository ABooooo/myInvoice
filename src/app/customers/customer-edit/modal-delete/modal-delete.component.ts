import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
})

export class ModalDeleteComponent implements OnInit {
  @Input() customerId;

  constructor(public activeModal: NgbActiveModal, private http: HttpClient) { }

  ngOnInit(): void {

  }

  onCustomerDelete() {
    this.http
      .delete(environment.firebaseUrl + '/customers/' + this.customerId + '.json')
      .subscribe(() => {
        this.customerId = null;
        this.activeModal.close(true);
      }, error => {
        this.activeModal.close(false);
      });
    };
}
