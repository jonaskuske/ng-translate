import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable, delayWhen, map, of, tap } from 'rxjs'
import { HistoryService } from './history.service'
import { environment } from '../environments/environment'
import {
	TranslationData,
	TranslationResult,
	Language,
	UsageData,
} from './types'

const API_URL = `${environment.API_HOST}/api`

@Injectable({ providedIn: 'root' })
export class TranslationService {
	private readonly http = inject(HttpClient)
	private readonly history = inject(HistoryService)

	translate(data: TranslationData, addToHistory = true) {
		return this.http
			.post<TranslationResult>(`${API_URL}/v2/translate`, data)
			.pipe(
				tap((result) => addToHistory && this.history.addEntry(result, data)),
			)
	}

	getUsage() {
		return this.http.get<UsageData>(`${API_URL}/v2/usage`)
	}

	getSourceLanguages() {
		return this.http
			.get<Language[]>(`${API_URL}/v2/languages?type=source`)
			.pipe(
				delayWhen((result) => this.translateLangNames(result)),
				map((result) => this.mapLangNames(result)),
			)
	}
	getTargetLanguages() {
		return this.http
			.get<Language[]>(`${API_URL}/v2/languages?type=target`)
			.pipe(
				delayWhen((result) => this.translateLangNames(result)),
				map((result) => this.mapLangNames(result)),
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
