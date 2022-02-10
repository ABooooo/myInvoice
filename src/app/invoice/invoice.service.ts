import { EventEmitter } from '@angular/core';

import { Service } from 'src/app/shared/services.model';

export class InvoiceService {
    // listener if service change
    servicesChanged = new EventEmitter<Service[]>();
    servicesEdit = new EventEmitter<Service[]>();

    private services: Service[] = [];
    private editServices: Service[] = [];

    getServices() {
        // get services from array
       return this.services;     
    }

    addService(service: Service) {
        // push to services array
        this.services.push(service);
        // send to listener
        this.servicesChanged.emit(this.services);
    }

    editService(activity:string, hours:number, isFlatRate:boolean, flatRate:number, hourRate: number) {
        const editService = {
            activity: activity, 
            hours: hours, 
            isFlatRate: isFlatRate, 
            flatRate: flatRate, 
            hourRate:hourRate
        }

        // empty an array if some service was already edited
        this.editServices = [];
        // push to editServices array
        this.editServices.push(editService);
        this.servicesEdit.emit(this.editServices);
    }
}