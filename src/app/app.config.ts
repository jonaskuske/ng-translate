import { ApplicationConfig, LOCALE_ID } from "@angular/core"
import { provideRouter, withHashLocation, withViewTransitions } from "@angular/router"

import { routes } from "./app.routes"
import { provideHttpClient } from "@angular/common/http"
import { TranslationService } from "./translation.service"

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes, withHashLocation(), withViewTransitions()),
		provideHttpClient(),
		TranslationService,
		{ provide: LOCALE_ID, useValue: "de-DE" },
	],
}
