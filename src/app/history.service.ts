import { Injectable } from '@angular/core'
import { HistoryEntry, TranslationData, TranslationResult } from './types'
import { DBSchema, openDB } from 'idb'

export interface TranslateDB extends DBSchema {
	history: {
		key: Date
		value: HistoryEntry
	}
}

@Injectable({ providedIn: 'root' })
export class HistoryService {
	db = openDB<TranslateDB>('translate', 5, {
		upgrade(database) {
			if (!database.objectStoreNames.contains('history')) {
				database.createObjectStore('history', {
					autoIncrement: false,
					keyPath: 'date',
				})
			}
		},
	})

	async addEntry(result: TranslationResult, data: TranslationData) {
		const entry: HistoryEntry = { result, data, date: new Date() }
		return (await this.db).put('history', entry)
	}

	async getEntries() {
		return (await this.db).getAll('history')
	}

	async getCount() {
		return (await this.db).count('history')
	}

	async reset() {
		return (await this.db).clear('history')
	}
}
