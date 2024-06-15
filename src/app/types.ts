export type Formality =
	| 'default'
	| 'more'
	| 'less'
	| 'prefer_more'
	| 'prefer_less'

export type TranslationData = {
	text: string[]
	target_lang: string
	source_lang?: string
	context?: string
	formality?: Formality
	preserve_formatting?: boolean
	glossary_id?: string
}

export type HistoryEntry = {
	result: TranslationResult
	data: TranslationData
	date: Date
}

export type Translation = { text: string; detected_source_language: string }

export type TranslationResult = { translations: Translation[] }

export type Language = { language: string; name: string }

export type UsageData = { character_count: number; character_limit: number }
