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
		async upgrade(database) {
			if (!database.objectStoreNames.contains('history')) {
				database.createObjectStore('history', {
					autoIncrement: false,
					keyPath: 'date',
				})
			}
		},
	})

	async addEntry(result: TranslationResult, data: TranslationData) {
		const db = await this.db
		return db.put('history', { result, data, date: new Date() })
	}

	async getEntries() {
		const db = await this.db
		return db.getAll('history')
	}

	async getCount() {
		const db = await this.db
		return db.count('history')
	}
}
