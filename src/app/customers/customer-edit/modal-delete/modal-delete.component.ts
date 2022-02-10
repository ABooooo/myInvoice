import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
})

export class ModalDeleteComponent implements OnInit {
  @Input() customerId;

  firebaseUrl = 'your firebase project url';

  constructor(public activeModal: NgbActiveModal, private http: HttpClient) { }

  ngOnInit(): void {

  }

  onCustomerDelete() {
    this.http
      .delete(this.firebaseUrl + '/customers/' + this.customerId + '.json')
      .subscribe(() => {
        this.customerId = null;
        this.activeModal.close(true);
      }, error => {
        this.activeModal.close(false);
      });
    };
}
