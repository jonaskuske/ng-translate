import { AsyncPipe, CommonModule, DatePipe, NgFor } from "@angular/common"
import { Component } from "@angular/core"
import { RouterOutlet, RouterModule, ActivatedRoute, Router } from "@angular/router"
import { DBUIElementsModule } from "@db-ui/ngx-elements-enterprise/dist/lib"
import { HistoryService } from "../history.service"
import { HistoryEntry } from "../types"
import { map } from "rxjs"

@Component({
	selector: "app-history",
	standalone: true,
	imports: [RouterOutlet, RouterModule, DBUIElementsModule, CommonModule],
	template: `
		<db-headline variant="2">Letze Übersetzungen</db-headline>
		<db-cards>
			@for (item of (entries | async); track $index) {
			<db-card>
				<db-headline>
					{{ item.result.translations[0].detected_source_language }}
					→
					{{ item.data.target_lang }}
				</db-headline>
				<p>{{ item.result.translations[0].text | slice : 0 : 400 }}</p>
			</db-card>
			}
		</db-cards>
		<!-- <div class="flex justify-center" style="margin: 1rem 0;">
			<db-pagination
				[attr.currentpage]="currentPage | async"
				[attr.pages]="10 || (pages | async)"
				count="2"
				(dbChange)="log($event)"
			/>
		</div> -->
	`,
	styles: [],
})
export default class HistoryComponent {
	title = "History"
	entries: Promise<HistoryEntry[]>
	log = console.log
	pages = this.history.getCount().then((count) => Math.ceil(count / 20))

	currentPage = this.router.routerState.root.queryParamMap.pipe(
		map((query) => query.get("page") || "1"),
	)

	// page = this.router.

	constructor(public history: HistoryService, private router: Router) {
		this.entries = history.getEntries()
	}
}
