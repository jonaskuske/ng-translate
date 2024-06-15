import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class SettingsService {
	get apiKey() {
		return localStorage.getItem('api_key') || ''
	}
	set apiKey(key: string) {
		localStorage.setItem('api_key', key)
	}
}
