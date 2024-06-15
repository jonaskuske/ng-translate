export type Formality =
	| 'default'
	| 'more'
	| 'less'
	| 'prefer_more'
	| 'prefer_less'

export interface TranslationData {
	text: string[]
	target_lang: string
	source_lang?: string
	context?: string
	formality?: Formality
	preserve_formatting?: boolean
	glossary_id?: string
}

export interface HistoryEntry {
	result: TranslationResult
	data: TranslationData
	date: Date
}

export interface Translation {
	text: string
	detected_source_language: string
}

export interface TranslationResult {
	translations: Translation[]
}

export interface Language {
	language: string
	name: string
}

export interface UsageData {
	character_count: number
	character_limit: number
}
