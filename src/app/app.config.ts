import {
	ApplicationConfig,
	inject,
	LOCALE_ID,
	provideExperimentalZonelessChangeDetection,
} from '@angular/core'
import {
	provideRouter,
	withComponentInputBinding,
	withRouterConfig,
	withViewTransitions,
} from '@angular/router'
import {
	HttpHandlerFn,
	HttpRequest,
	provideHttpClient,
	withFetch,
	withInterceptors,
} from '@angular/common/http'

import { routes } from './app.routes'
import { SettingsService } from './settings.service'

export function authInterceptor(
	req: HttpRequest<unknown>,
	next: HttpHandlerFn,
) {
	const apiKey = inject(SettingsService).apiKey()
	const reqWithAuth = req.clone({
		headers: req.headers.append('authorization', `DeepL-Auth-Key ${apiKey}`),
	})

	return next(reqWithAuth)
}

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(
			routes,
			withRouterConfig({ onSameUrlNavigation: 'reload' }),
			withViewTransitions({ skipInitialTransition: true }),
			withComponentInputBinding(),
		),
		provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
		provideExperimentalZonelessChangeDetection(),
		{ provide: LOCALE_ID, useValue: 'de-DE' },
	],
}
