import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, delayWhen, map, of, tap } from "rxjs"
import { HistoryService } from "./history.service"
import { SettingsService } from "./settings.service"

export type Formality = "default" | "more" | "less" | "prefer_more" | "prefer_less"
export type TranslationData = {
	text: string[]
	target_lang: string
	source_lang?: string
	context?: string
	formality?: Formality
	preserve_formatting?: boolean
	glossary_id?: string
}
export type Translation = { text: string; detected_source_language: string }
export type TranslationResult = { translations: Translation[] }

export type Language = { language: string; name: string }

@Injectable({ providedIn: "root" })
export class TranslationService {
	constructor(
		private http: HttpClient,
		private history: HistoryService,
		private settings: SettingsService,
	) {}

	API_URL = "http://localhost:3007"

	translate(data: TranslationData, addToHistory = true) {
		return this.http
			.post<TranslationResult>(`${this.API_URL}/v2/translate`, data, {
				headers: { authorization: this.settings.apiKey },
			})
			.pipe(tap((result) => addToHistory && this.history.addEntry(result)))
	}

	#langNameMap = new Map<string, string>(JSON.parse(localStorage.getItem("lang_names") || "[]"))

	get langNames() {
		return this.#langNameMap
	}
	setLangName(language: string, name: string) {
		this.#langNameMap.set(language, name)
		localStorage.setItem("lang_names", JSON.stringify([...this.#langNameMap.entries()]))
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

	private translateLangNames(languages: Language[]): Observable<any> {
		const untranslated = languages.filter((l) => !this.#langNameMap.has(l.language))
		if (!untranslated.length) return of(null)

		const data = { text: untranslated.map((l) => l.name), source_lang: "EN", target_lang: "DE" }
		return this.translate(data, false).pipe(
			tap(({ translations }) => {
				untranslated.forEach((l, i) => this.setLangName(l.language, translations[i].text))
			}),
		)
	}

	private mapLangNames(languages: Language[]): Language[] {
		return languages.map(({ language }) => ({ language, name: this.langNames.get(language)! }))
	}
}
