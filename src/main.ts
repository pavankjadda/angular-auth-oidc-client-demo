import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { authConfig } from './app/auth-config';
import { provideAuth } from 'angular-auth-oidc-client';

bootstrapApplication(AppComponent, {
	providers: [provideAuth(authConfig), importProvidersFrom(BrowserModule, RouterModule.forRoot(appRoutes)), provideHttpClient(withFetch())],
}).catch((err) => console.error(err));
