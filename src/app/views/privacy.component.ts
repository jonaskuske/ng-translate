import { Component } from "@angular/core"
import { RouterOutlet, RouterModule } from "@angular/router"
import { DBUIElementsModule } from "@db-ui/ngx-elements-enterprise/dist/lib"

@Component({
	selector: "app-privacy",
	standalone: true,
	imports: [RouterOutlet, RouterModule, DBUIElementsModule],
	template: `
		<db-headline pulse variant="1">Datenschutz</db-headline>
		<p>
			Dieses Angebot nutzt für Übersetzungen die Dienste von DeepL SE, Maarweg 165, 50825 Köln:
			<a href="https://www.deepl.com/de/publisher">www.deepl.com/de/publisher</a>. Für die
			Übersetzung werden der zu übersetzende Text sowie die Übersetzungs-Einstellungen an DeepL SE
			übertragen. DeepL SE erhält dabei auch Zugriff auf Ihre IP-Adresse. Mit der Nutzung erklären
			Sie sich mit diesem Vorgehen einverstanden.
		</p>
		<p>
			Falls Sie die auf der Seite und im Impressum genannten Daten zur Kontaktaufnahme nutzen, so
			verwenden wir Ihre Kontaktdaten, die wir der Absenderadresse entnehmen können, ausschließlich
			zur Beantwortung Ihrer Anfrage; auf Wunsch löschen wir diese selbstverständlich wieder.
		</p>
	`,
	styles: [],
})
export default class PrivacyComponent {}
