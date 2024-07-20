import { LogLevel, PassedInitialConfig } from 'angular-auth-oidc-client';

export const authConfig: PassedInitialConfig = {
	config: {
		authority: 'https://auth.ncats.nih.gov/_api/v2/auth/NCI-CCR-TEST',
		redirectUrl: window.location.origin,
		postLogoutRedirectUri: `${window.location.origin}/logout_success`,
		clientId: 'pres',
		scope: 'openid profile email offline_access',
		responseType: 'code',
		silentRenew: true,
		silentRenewUrl: `${window.location.origin}/silent-renew.html`,
		useRefreshToken: true,
		silentRenewTimeoutInSeconds: 60,
		renewTimeBeforeTokenExpiresInSeconds: 300,
		triggerAuthorizationResultEvent: true,
		ignoreNonceAfterRefresh: true,
		logLevel: LogLevel.Error,
	},
};
