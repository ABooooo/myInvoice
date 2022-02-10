import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { InvoiceComponent } from "./invoice/invoice.component";
import { CustomersComponent } from "./customers/customers.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'invoice', component: InvoiceComponent, canActivate: [AuthGuard] },
    { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard] },
    { path: 'login', component: AuthComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}