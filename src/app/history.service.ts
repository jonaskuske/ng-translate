import { Injectable } from "@angular/core"
import { HistoryEntry, TranslationData, TranslationResult } from "./types"
import { openDB, type IDBPDatabase } from "idb"

@Injectable({ providedIn: "root" })
export class HistoryService {
	db: Promise<IDBPDatabase>

	constructor() {
		this.db = openDB("translate", 1, {
			upgrade(database, oldVersion, newVersion, transaction, event) {
				database.createObjectStore("history", { autoIncrement: true })
			},
		})
	}

	async addEntry(result: TranslationResult, data: TranslationData) {
		const db = await this.db
		const entry: HistoryEntry = { result, data, date: new Date().toISOString() }

		return db.put("history", entry)
	}

	async getEntries(page = 1): Promise<HistoryEntry[]> {
		const db = await this.db
		return db.getAll("history")
	}

	async getCount() {
		const db = await this.db
		return db.count("history")
	}
}
