import { ApplicationConfig, importProvidersFrom } from "@angular/core"
import { provideRouter, withHashLocation, withViewTransitions } from "@angular/router"

import { routes } from "./app.routes"
import { HttpClientModule } from "@angular/common/http"
import { TranslationService } from "./translation.service"

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes, withHashLocation(), withViewTransitions()),
		importProvidersFrom(HttpClientModule),
		TranslationService,
	],
}
