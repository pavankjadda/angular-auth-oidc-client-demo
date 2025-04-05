import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-logout-success',
	imports: [],
	template: `
		<h1>Logout</h1>
		<p>You are successfully logged out. Please close this window</p>
		<button (click)="login()" aria-label="Login Again">Login</button>
	`,
	styles: ``,
})
export class LogoutSuccessComponent {
	router = inject(Router);

	/**
	 * Redirect user to home page as that takes care of login
	 *
	 * @author Pavan Kumar Jadda
	 * @since 1.8.0
	 */
	login() {
		this.router.navigate(['/']).then(() => {
			window.location.reload();
		});
	}
}
