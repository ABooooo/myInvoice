import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Service } from 'src/app/shared/services.model';
import { InvoiceService } from '../../invoice.service';

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html'
})
export class InvoiceItemComponent implements OnInit {
  services: Service[];
  positionNum: 0;
  invoiceTotalSum = 0;

  @Output() totalSumChangedEvent = new EventEmitter<any>();

  // connect to service
  constructor(private invService: InvoiceService) { }

  ngOnInit(): void {
    // on init call services
    this.services = this.invService.getServices();
    // call listener if something has changed
    this.invService.servicesChanged
      .subscribe(
        (services: Service[]) => {
          this.services = services;
          this.calcTotalSum();
        }
      );
  }

  calcTotalSum() {
    this.invoiceTotalSum = 0;
    for (var i = 0; i < this.services.length; i++) {
      if (!this.services[i].isFlatRate) {
        const serviceSum = this.services[i].hourRate * this.services[i].hours;
        const newTotalSum = this.invoiceTotalSum + serviceSum;
        this.invoiceTotalSum = newTotalSum;
      } else {
        const newTotalSum = this.invoiceTotalSum + Number(this.services[i].flatRate);
        this.invoiceTotalSum = newTotalSum;
      }
    }
    this.onChangeItems();
  }

  onEditItemClick(index: number, activity: string, hours: number, hourRate: number, isFlatRate: boolean, flatRate: number) {
    this.invService.editService(activity, hours, isFlatRate, flatRate, hourRate);
    this.services.splice(index, 1);
  }

  onChangeItems() {
    this.totalSumChangedEvent.emit(this.invoiceTotalSum);
  }

  onDeleteItemClick(index: number) {
    this.services.splice(index, 1);
    this.calcTotalSum();
  }

  onMouseEnter(i) {
    var el = document.getElementById("buttons-" + i);
    if (el.style.display === "none") {
      el.style.display = "block";
    }
  }

  onMouseLeave(i) {
    var el = document.getElementById("buttons-" + i);
    if (el.style.display === "block") {
      el.style.display = "none";
    }
  }

}

