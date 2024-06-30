import { ApplicationConfig, inject, LOCALE_ID } from '@angular/core'
import {
	provideRouter,
	withHashLocation,
	withViewTransitions,
} from '@angular/router'

import { routes } from './app.routes'
import {
	HttpHandlerFn,
	HttpRequest,
	provideHttpClient,
	withInterceptors,
} from '@angular/common/http'
import { TranslationService } from './translation.service'
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
		provideRouter(routes, withHashLocation(), withViewTransitions()),
		provideHttpClient(withInterceptors([authInterceptor])),
		TranslationService,
		{ provide: LOCALE_ID, useValue: 'de-DE' },
	],
}
