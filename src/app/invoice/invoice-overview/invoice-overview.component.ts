import { Component, OnInit } from '@angular/core';

import { HeaderDataModel } from 'src/app/shared/headerData.model';
import { HeaderDataService } from '../invoiceHeader.service';

@Component({
  selector: 'app-invoice-overview',
  templateUrl: './invoice-overview.component.html'
})
export class InvoiceOverviewComponent implements OnInit {
  currentYear = new Date().getFullYear();
  currentDate = new Date();
  totalSum = 0;
  totalTaxSum = 0;

  data: HeaderDataModel;

  constructor(private invDataService: HeaderDataService) { }

  ngOnInit(): void {
    // on init call services
    this.data = this.invDataService.getHeaderData();
    // call listener if something has changed
    this.invDataService.dataChanged
      .subscribe(
        (newData: HeaderDataModel) => {
          this.data = newData;
        }
      );
  }

  updateTotalSum(newTotalSum) {
    this.totalSum = newTotalSum;
    this.totalTaxSum = (newTotalSum * 1.2) - newTotalSum;
  }
}
