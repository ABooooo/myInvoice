export class HeaderDataModel {
    public customerData: any;
    public invoiceNum: number;
    public isAbroad: boolean;
    
    constructor(customerId:any, invoiceNum:number, isAbroad:boolean) {
        this.customerData = customerId;
        this.invoiceNum = invoiceNum;
        this.isAbroad = isAbroad;
    }

    // short definition
    //constructor(public activity: string, public hours:number) {}
}