import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DBSection } from '@db-ux/ngx-core-components'

@Component({
	selector: 'app-privacy',
	imports: [RouterModule, DBSection],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<db-section width="medium" spacing="small" data-density="functional">
			<h1>Datenschutz</h1>
			<p>
				Dieses Angebot nutzt für Übersetzungen die Dienste von DeepL SE, Maarweg
				165, 50825 Köln:
				<a href="https://www.deepl.com/de/publisher">
					www.deepl.com/de/publisher </a
				>. Für die Übersetzung werden der zu übersetzende Text sowie die
				Übersetzungs-Einstellungen an DeepL SE übertragen. DeepL SE erhält dabei
				auch Zugriff auf Ihre IP-Adresse. Mit der Nutzung erklären Sie sich mit
				diesem Vorgehen einverstanden.
			</p>
			<p>
				Falls Sie die auf der Seite und im Impressum genannten Daten zur
				Kontaktaufnahme nutzen, so verwenden wir Ihre Kontaktdaten, die wir der
				Absenderadresse entnehmen können, ausschließlich zur Beantwortung Ihrer
				Anfrage; auf Wunsch löschen wir diese selbstverständlich wieder.
			</p>
		</db-section>
	`,
})
export default class PrivacyComponent {}
