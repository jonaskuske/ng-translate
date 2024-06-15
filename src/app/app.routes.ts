import { inject } from '@angular/core'
import { CanMatchFn, Router, Routes } from '@angular/router'
import { TranslationService } from './translation.service'
import { catchError, map, of } from 'rxjs'

const ensureAuthGuard: CanMatchFn = (route, url) => {
	const translation = inject(TranslationService)
	const router = inject(Router)
	const from = encodeURIComponent(router.routerState.snapshot.url)

	return translation.getUsage().pipe(
		map(() => true),
		catchError(() => of(router.parseUrl(`/auth?from=${from}`))),
	)
}
const ensureNoAuthGuard: CanMatchFn = (route, url) => {
	const translation = inject(TranslationService)
	const router = inject(Router)
	const from = router.routerState.snapshot.root.queryParamMap.get('from')

	return translation.getUsage().pipe(
		map(() => router.parseUrl(from || '/')),
		catchError(() => of(true)),
	)
}

export const routes: Routes = [
	{
		path: 'imprint',
		title: 'Impressum',
		loadComponent: () => import('./views/imprint.component'),
	},
	{
		path: 'privacy',
		title: 'Datenschutz',
		loadComponent: () => import('./views/privacy.component'),
	},
	{
		path: 'auth',
		title: 'Anmelden',
		canMatch: [ensureNoAuthGuard],
		loadComponent: () => import('./views/auth.component'),
	},
	{
		path: '',
		canMatch: [ensureAuthGuard],
		children: [
			{
				path: '',
				title: 'Translate',
				loadComponent: () => import('./views/index.component'),
			},
			{
				path: 'history',
				title: 'Verlauf',
				loadComponent: () => import('./views/history.component'),
			},
			{
				path: 'settings',
				title: 'Einstellungen',
				loadComponent: () => import('./views/settings.component'),
			},
			{
				path: 'glossary',
				title: 'Glossar',
				loadComponent: () => import('./views/glossary.component'),
			},
		],
	},
]
