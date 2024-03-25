import { NgFor } from "@angular/common"
import { Component } from "@angular/core"
import { RouterOutlet, RouterModule } from "@angular/router"
import { DBUIElementsModule } from "@db-ui/ngx-elements-enterprise/dist/lib"
import { HistoryService } from "../history.service"

@Component({
	selector: "app-history",
	standalone: true,
	imports: [RouterOutlet, RouterModule, DBUIElementsModule, NgFor],
	template: `
		<db-headline variant="2">Letze Übersetzungen</db-headline>
		<db-cards>
			@for (item of history.getEntries(); track $index) {
			<db-card [attr.header]="$index" [content]="item.translations[0].text" />
			}
		</db-cards>
		<div class="flex justify-center" style="margin: 1rem 0;">
			<db-pagination currentpage="1" pages="3" count="3"></db-pagination>
		</div>
	`,
	styles: [],
})
export default class HistoryComponent {
	title = "History"

	constructor(public history: HistoryService) {}
}
