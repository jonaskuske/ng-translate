import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DBSection } from '@db-ux/ngx-core-components'

@Component({
	selector: 'app-imprint',
	imports: [RouterModule, DBSection],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<db-section width="medium" spacing="small" data-density="functional">
			<h1>Impressum</h1>
			<h2>Angaben gemäß §5 TMG</h2>
			<p>Jonas Kuske, 69120 Heidelberg</p>
			<h3>Verantwortlich für Inhalte gemäß 55 Abs. 2 RStV</h3>
			<p>Jonas Kuske<br />Schulzengasse 11, 69120 Heidelberg</p>
			<h3>Kontakt</h3>
			<p>Telefon: +491603336948</p>
			<p>Mail: mail&#64;jonaskuske.com</p>

			<h2>Haftungsausschluss</h2>
			<h3>Haftung für Inhalte</h3>
			<p>
				Die Inhalte dieser Seite wurden mit größter Sorgfalt erstellt. Für die
				Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir
				jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß §7
				Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen
				Gesetzen verantwortlich. Nach §§8 bis 10 TMG sind wir als
				Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
				gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
				forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
				Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
				Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
				Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
				Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von
				entsprechenden Rechtsverletzungen werde ich diese Inhalte umgehend
				entfernen.
			</p>
			<h3>Haftung für Links</h3>
			<p>
				Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
				Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
				Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
				Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
				verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
				Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte
				waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente
				inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
				Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden
				von Rechtsverletzungen werde ich derartige Links umgehend entfernen. Die
				durch die Seitenbetreiber erstellten bzw. verwendeten Inhalte und Werke
				auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die
				Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
				außerhalb der Grenzen des Urheberrechtes bedürfen der Zustimmung des
				jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite
				sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
				Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden,
				werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte
				Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
				Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
				entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden
				wir derartige Inhalte umgehend entfernen.
			</p>
		</db-section>
	`,
	styles: [],
})
export default class ImprintComponent {}
