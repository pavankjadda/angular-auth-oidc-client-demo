import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EventTypes, OidcSecurityService, PublicEventsService } from 'angular-auth-oidc-client';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	standalone: true,
	imports: [CommonModule, RouterOutlet, EmployeeListComponent, RouterLink],
})
export class AppComponent implements OnInit {
	oidcSecurityService = inject(OidcSecurityService);
	eventService = inject(PublicEventsService);
	userData = toSignal(this.oidcSecurityService.userData$);

	ngOnInit(): void {
		this.eventService
			.registerForEvents()
			.pipe(
				filter(
					(notification) =>
						notification.type === EventTypes.TokenExpired ||
						notification.type === EventTypes.IdTokenExpired ||
						notification.type === EventTypes.SilentRenewFailed
				)
			)
			.subscribe((_value) => {
				console.log('_value', _value);
				this.oidcSecurityService.authorize();
			});

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
