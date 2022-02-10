import { EventEmitter } from '@angular/core';

import { HeaderDataModel } from 'src/app/shared/headerData.model';

export class HeaderDataService {
    // listener if service change
    dataChanged = new EventEmitter<HeaderDataModel>();

    private data: HeaderDataModel = {
        customerData: {},
        invoiceNum: 0,
        isAbroad: false
    };

    getHeaderData() {
        // get services from array
        return this.data;         
    }

    addHeaderData(newData: HeaderDataModel) {
        // push to services array
        this.data = newData;
        // send to listener 
        this.dataChanged.emit(this.data);
    }
}