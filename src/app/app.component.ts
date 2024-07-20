import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	standalone: true,
	imports: [CommonModule, RouterOutlet, EmployeeListComponent, RouterLink],
})
export class AppComponent implements OnInit {
	oidcSecurityService = inject(OidcSecurityService);
	authenticatedResult = toSignal(this.oidcSecurityService.isAuthenticated$);
	userData = toSignal(this.oidcSecurityService.userData$);

	ngOnInit(): void {
		this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, configId }) => {
			if (!window?.location?.href.includes('logout')) {
				if (!isAuthenticated) {
					this.oidcSecurityService.authorize();
				} else {
					sessionStorage.setItem('configId', configId ?? '');
					console.log('User is authenticated');
				}
			}
		});
	}
}
