import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService, private router: Router) {}

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;

        this.isLoading = true;
        this.authService.signIn(email, password).subscribe(responseData => {
            this.isLoading = false;

            this.router.navigate(['/invoice']);
        }, errorResponse => {
            this.isLoading = false;
            let errorMessage = 'An error occured!';
            if (!errorResponse.error || !errorResponse.error.error) {
                this.error = errorMessage;
                return;
            }
            this.error = errorResponse.error.error.message;
        }); 
        form.reset();
    }

    dismissErrorAlertBox() {
        this.error = null;
    }

}