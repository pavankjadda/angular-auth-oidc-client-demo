import { Component, inject, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
	selector: 'app-logout',
	imports: [],
	template: ` <p>Please wait...</p> `,
	styles: ``,
})
export class LogoutComponent implements OnInit {
	oidcSecurityService = inject(OidcSecurityService);

	ngOnInit(): void {
		this.oidcSecurityService.logoffAndRevokeTokens().subscribe(() => {
			// Reset NgRx Stores and Current User object in store
			sessionStorage.removeItem(sessionStorage.getItem('configId') ?? '');
		});
	}
}
