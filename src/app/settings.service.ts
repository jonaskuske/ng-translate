import { Injectable, signal, effect } from '@angular/core'

const STORAGE_API_KEY = 'api_key'
const STORAGE_DARK_MODE = 'color_scheme'

export type ColorScheme = 'light dark' | 'light' | 'dark'

@Injectable({ providedIn: 'root' })
export class SettingsService {
	readonly apiKey = signal(localStorage.getItem(STORAGE_API_KEY) ?? '')
	readonly colorScheme = signal<ColorScheme>(
		(localStorage.getItem(STORAGE_DARK_MODE) as ColorScheme | null) ??
			'light dark',
	)

	reset() {
		this.apiKey.set('')
		this.colorScheme.set('light dark')
	}

	constructor() {
		effect(() => {
			localStorage.setItem(STORAGE_API_KEY, this.apiKey())
		})
		effect(() => {
			localStorage.setItem(STORAGE_DARK_MODE, String(this.colorScheme()))
		})
	}
}
