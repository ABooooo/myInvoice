export class Service {
    public activity: string;
    public hours: number;
    public isFlatRate: boolean;
    public flatRate: number;
    public hourRate: number;

    constructor(activity:string, hours:number, isFlatRate:boolean, flatRate:number, hourRate: number) {
        this.activity = activity;
        this.hours = hours;
        this.isFlatRate = isFlatRate;
        this.flatRate = flatRate;
        this.hourRate = hourRate;
    }

    // short definition
    //constructor(public activity: string, public hours:number) {}
}