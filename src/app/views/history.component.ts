import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { RouterOutlet, RouterModule, Router } from '@angular/router'
import { HistoryService } from '../history.service'
import { DBCard, DBSection } from '@db-ui/ngx-components'

@Component({
	selector: 'app-history',
	standalone: true,
	imports: [RouterOutlet, RouterModule, CommonModule, DBSection, DBCard],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<db-section width="large" data-density="functional">
			<h2>Letzte Übersetzungen</h2>

			<div
				class="grid"
				style="grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: var(--db-spacing-fixed-md)"
			>
				@for (item of entries | async; track item.date) {
					<article>
						<db-card spacing="medium">
							<h3 class="flex">
								{{ item.result.translations[0].detected_source_language }}
								→
								{{ item.data.target_lang }}
								<span class="date">{{ item.date | date: 'short' }}</span>
							</h3>
							<p style="white-space: pre-line;">
								{{ item.result.translations[0].text | slice: 0 : 250 }}
							</p>
						</db-card>
					</article>
				}
			</div>
		</db-section>
	`,
	styles: [
		`
			.date {
				margin-left: auto;
				font-size: 12px;
				align-self: center;
				color: var(--db-neutral-contrast-low-enabled);
			}
		`,
	],
})
export default class HistoryComponent {
	private readonly history = inject(HistoryService)
	private readonly router = inject(Router)

	entries = this.history.getEntries()
	pages = this.history.getCount().then((count) => Math.ceil(count / 20))

	// currentPage = this.router.routerState.root.queryParamMap.pipe(
	// 	map((query) => query.get('page') || '1'),
	// )
}
