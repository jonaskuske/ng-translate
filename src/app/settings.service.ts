import { Injectable, signal, effect } from '@angular/core'

const STORAGE_API_KEY = 'api_key'
const STORAGE_DARK_MODE = 'dark_mode'

export type ColorScheme = 'light dark' | 'light' | 'dark'

@Injectable({ providedIn: 'root' })
export class SettingsService {
	readonly apiKey = signal(localStorage.getItem(STORAGE_API_KEY) ?? '')
	readonly colorScheme = signal(
		(localStorage.getItem(STORAGE_DARK_MODE) ?? 'auto') as ColorScheme,
	)

	constructor() {
		effect(() => {
			localStorage.setItem(STORAGE_API_KEY, this.apiKey())
		})
		effect(() => {
			localStorage.setItem(STORAGE_DARK_MODE, String(this.colorScheme()))
		})
	}
}
