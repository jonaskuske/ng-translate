import { Injectable } from "@angular/core"

@Injectable({ providedIn: "root" })
export class HistoryService {
	constructor() {}
	addEntry(data: unknown) {
		localStorage.setItem(
			"entries",
			JSON.stringify([data, ...JSON.parse(localStorage.getItem("entries") || "[]")]),
		)
	}

	getEntries() {
		return JSON.parse(localStorage.getItem("entries") || "[]")
	}
}
