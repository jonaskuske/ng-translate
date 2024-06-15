import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, delayWhen, map, of, tap } from 'rxjs'
import { HistoryService } from './history.service'
import { SettingsService } from './settings.service'
import { environment } from '../environments/environment'
import {
	TranslationData,
	TranslationResult,
	Language,
	UsageData,
} from './types'

@Injectable({ providedIn: 'root' })
export class TranslationService {
	constructor(
		private http: HttpClient,
		private history: HistoryService,
		private settings: SettingsService,
	) {}

	API_URL = `${environment.API_HOST}/api`

	translate(data: TranslationData, addToHistory = true) {
		return this.http
			.post<TranslationResult>(`${this.API_URL}/v2/translate`, data, {
				headers: { authorization: this.settings.apiKey },
			})
			.pipe(
				tap((result) => addToHistory && this.history.addEntry(result, data)),
			)
	}

	#langNameMap = new Map<string, string>(
		JSON.parse(localStorage.getItem('lang_names') || '[]'),
	)

	get langNames() {
		return this.#langNameMap
	}
	setLangName(language: string, name: string) {
		this.#langNameMap.set(language, name)
		localStorage.setItem(
			'lang_names',
			JSON.stringify([...this.#langNameMap.entries()]),
		)
	}

	getUsage() {
		return this.http.get<UsageData>(`${this.API_URL}/v2/usage`, {
			headers: { authorization: this.settings.apiKey },
		})
	}

	getSourceLanguages() {
		return this.http
			.get<Language[]>(`${this.API_URL}/v2/languages?type=source`, {
				headers: { authorization: this.settings.apiKey },
			})
			.pipe(
				delayWhen((result) => this.translateLangNames(result)),
				map((result) => this.mapLangNames(result)),
			)
	}
	getTargetLanguages() {
		return this.http
			.get<Language[]>(`${this.API_URL}/v2/languages?type=target`, {
				headers: { authorization: this.settings.apiKey },
			})
			.pipe(
				delayWhen((result) => this.translateLangNames(result)),
				map((result) => this.mapLangNames(result)),
			)
	}

	private translateLangNames(languages: Language[]): Observable<unknown> {
		const untranslated = languages.filter(
			(l) => !this.#langNameMap.has(l.language),
		)
		if (!untranslated.length) return of(null)

		const data = {
			text: untranslated.map((l) => l.name),
			source_lang: 'EN',
			target_lang: 'DE',
		}
		return this.translate(data, false).pipe(
			tap(({ translations }) => {
				untranslated.forEach((l, i) =>
					this.setLangName(l.language, translations[i].text),
				)
			}),
		)
	}

	private mapLangNames(languages: Language[]): Language[] {
		return languages.map(({ language }) => ({
			language,
			name: this.langNames.get(language)!,
		}))
	}
}
