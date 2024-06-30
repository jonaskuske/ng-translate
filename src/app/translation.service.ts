import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable, map, of, switchMap, tap } from 'rxjs'
import { HistoryService } from './history.service'
import { environment } from '../environments/environment'
import {
	TranslationData,
	TranslationResult,
	Language,
	UsageData,
} from './types'

const API_URL = `${environment.API_HOST}/api`
const STORAGE_LANG_TRANSLATIONS = 'lang_names'

@Injectable({ providedIn: 'root' })
export class TranslationService {
	private readonly http = inject(HttpClient)
	private readonly history = inject(HistoryService)

	translate(data: TranslationData, addToHistory = true) {
		return this.http
			.post<TranslationResult>(`${API_URL}/v2/translate`, data)
			.pipe(
				tap((result) => {
					if (addToHistory) void this.history.addEntry(result, data)
				}),
			)
	}

	getUsage() {
		return this.http.get<UsageData>(`${API_URL}/v2/usage`)
	}

	getSourceLanguages() {
		return this.http
			.get<Language[]>(`${API_URL}/v2/languages?type=source`)
			.pipe(switchMap((result) => this.#translateDisplayNames(result)))
	}

	getTargetLanguages() {
		return this.http
			.get<Language[]>(`${API_URL}/v2/languages?type=target`)
			.pipe(switchMap((result) => this.#translateDisplayNames(result)))
	}

	#translateDisplayNames(languages: Language[]): Observable<Language[]> {
		const untranslated = languages.filter(
			(l) => !this.#translatedNames.has(l.language),
		)

		if (!untranslated.length) return of(this.#mapToTranslatedNames(languages))

		const data = {
			text: untranslated.map((language) => language.name),
			source_lang: 'EN',
			target_lang: 'DE',
		}

		return this.translate(data, false).pipe(
			map(({ translations }) => {
				for (const [idx, { text }] of translations.entries()) {
					this.#setTranslatedName(untranslated[idx].language, text)
				}

				return this.#mapToTranslatedNames(languages)
			}),
		)
	}

	#mapToTranslatedNames(languages: Language[]): Language[] {
		return languages.map(({ language }) => {
			const name = this.#translatedNames.get(language)!
			return { language, name }
		})
	}

	#translatedNames = new Map(
		JSON.parse(localStorage.getItem(STORAGE_LANG_TRANSLATIONS) ?? '[]') as [
			string,
			string,
		][],
	)

	#setTranslatedName(language: string, name: string) {
		this.#translatedNames.set(language, name)
		localStorage.setItem(
			STORAGE_LANG_TRANSLATIONS,
			JSON.stringify([...this.#translatedNames.entries()]),
		)
	}
}
