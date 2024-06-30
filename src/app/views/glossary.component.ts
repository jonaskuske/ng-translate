import { Component } from '@angular/core'
import { RouterOutlet, RouterModule } from '@angular/router'
import { DBSection } from '@db-ui/ngx-components'

@Component({
	selector: 'app-glossary',
	standalone: true,
	imports: [RouterOutlet, RouterModule, DBSection],
	template: `
		<db-section width="large">
			<p>Diese Funktion ist noch nicht verfügbar.</p>
			<!--
		<db-headline variant="2">Neuer Eintrag</db-headline>

		<div class="grid" style="grid-template-columns: 1fr 1fr; gap: 1rem;">
			<db-input label="Ausgangstext" style="grid-column: 1;" />
			<db-input label="Übersetzung" style="grid-column: 2;" />

			<db-button style="grid-column: span 2; justify-self: center;" variant="primary">
				Übersetzung hinzufügen
			</db-button>
		</div>
		<br />
		<br />
		<db-headline variant="2">Vorhande Einträge</db-headline>
		<p style="max-width: 65ch; text-wrap: pretty;">
			Die gespeicherten Übersetzungen werden automatisch berücksichtigt, wenn Ausgangs- und
			Zielsprachen übereinstimmen. Dies lässt sich in den erweiterten Optionen deaktivieren.
		</p>
		<br />

		<div class="flex" style="gap: 0.5rem; margin: 1rem 0">
			<db-chip selected>Deutsch → Englisch</db-chip>
			<db-chip>Englisch → Deutsch</db-chip>
		</div>

		<db-table density="large" border="horizontal" [attr.tabledata]="data" />
-->
		</db-section>
	`,
	styles: [],
})
export default class GlossaryComponent {
	data = JSON.stringify({
		caption: 'Einträge für Deutsch → Englisch',
		headers: ['Ausgangstext', 'Übersetzung'],
		rowTitle: '#',
		rowTitles: ['1', '2', '3', '4', '5'],
		rows: [
			{
				Ausgangstext: [null, 'Einse'],
				Übersetzung: [null, 'One'],
			},
			{
				Ausgangstext: [null, 'Zweie'],
				Übersetzung: [null, 'Two'],
			},
		],
	})
}
