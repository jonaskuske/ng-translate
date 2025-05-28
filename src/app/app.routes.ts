import { inject } from '@angular/core'
import { CanMatchFn, Router, Routes } from '@angular/router'
import { TranslationService } from './deepl-client'
import { catchError, map, of } from 'rxjs'

const ensureAuthGuard: CanMatchFn = () => {
	const translation = inject(TranslationService)
	const router = inject(Router)
	const from = encodeURIComponent(router.routerState.snapshot.url)

	return translation.getUsage().pipe(
		map(() => true),
		catchError(() => of(router.parseUrl(`/auth?from=${from}`))),
	)
}
const ensureNoAuthGuard: CanMatchFn = () => {
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
		loadComponent: () => import('./views/imprint'),
	},
	{
		path: 'privacy',
		title: 'Datenschutz',
		loadComponent: () => import('./views/privacy'),
	},
	{
		path: 'auth',
		title: 'Anmelden',
		canMatch: [ensureNoAuthGuard],
		loadComponent: () => import('./views/auth'),
	},
	{
		path: '',
		canMatch: [ensureAuthGuard],
		children: [
			{
				path: '',
				title: 'Translate',
				loadComponent: () => import('./views'),
			},
			{
				path: 'history',
				title: 'Verlauf',
				loadComponent: () => import('./views/history'),
			},
			{
				path: 'settings',
				title: 'Einstellungen',
				loadComponent: () => import('./views/settings'),
			},
			{
				path: 'glossary',
				title: 'Glossar',
				loadComponent: () => import('./views/glossary'),
			},
		],
	},
]
