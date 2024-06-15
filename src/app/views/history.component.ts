import { AsyncPipe, CommonModule, DatePipe, NgFor } from '@angular/common'
import { Component } from '@angular/core'
import {
	RouterOutlet,
	RouterModule,
	ActivatedRoute,
	Router,
} from '@angular/router'
import { DBUIElementsModule } from '@db-ui/ngx-elements-enterprise/dist/lib'
import { HistoryService } from '../history.service'
import { HistoryEntry } from '../types'
import { map } from 'rxjs'

@Component({
	selector: 'app-history',
	standalone: true,
	imports: [RouterOutlet, RouterModule, DBUIElementsModule, CommonModule],
	template: `
		<db-headline variant="2">Letzte Übersetzungen</db-headline>
		<db-cards>
			@for (item of entries | async; track item.date) {
				<db-card>
					<db-headline>
						{{ item.result.translations[0].detected_source_language }}
						→
						{{ item.data.target_lang }}
						<span class="date">{{ item.date | date: 'short' }}</span>
					</db-headline>
					<p style="white-space: pre-line;">
						{{ item.result.translations[0].text | slice: 0 : 250 }}
					</p>
				</db-card>
			}
		</db-cards>
		<div
			class="flex justify-center"
			style="margin-top: auto; padding-top: 1rem;"
		>
			<db-pagination
				[attr.currentpage]="currentPage | async"
				[attr.pages]="pages | async"
				count="3"
				(dbChange)="log($event)"
			/>
		</div>
	`,
	styles: [
		`
			:host {
				display: contents;
			}
			:host ::ng-deep db-pagination[pages='1'] ol li:nth-child(3) {
				display: none;
			}
			:host ::ng-deep db-pagination[pages='1'] ol li:first-child,
			:host ::ng-deep db-pagination[pages='1'] ol li:last-child {
				opacity: 0.25;
			}
			:host ::ng-deep db-card h3 {
				display: flex;
			}
			:host ::ng-deep db-card figcaption {
				width: 100%;
			}
			.date {
				margin-left: auto;
				font-size: 12px;
				align-self: center;
				color: var(--db-color-cool-gray-500);
			}
		`,
	],
})
export default class HistoryComponent {
	title = 'History'
	entries: Promise<HistoryEntry[]>
	log = console.log
	pages = this.history.getCount().then((count) => Math.ceil(count / 20))

	currentPage = this.router.routerState.root.queryParamMap.pipe(
		map((query) => query.get('page') || '1'),
	)

	// page = this.router.

	constructor(
		public history: HistoryService,
		private router: Router,
	) {
		this.entries = history.getEntries()
	}
}
