import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet, RouterModule } from '@angular/router'
import { DBInfotext, DBSection } from '@db-ui/ngx-components'

@Component({
	selector: 'app-glossary',
	standalone: true,
	imports: [RouterOutlet, RouterModule, DBSection, DBInfotext],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<db-section width="medium">
			<db-infotext>Diese Funktion ist noch nicht verfügbar.</db-infotext>
		</db-section>
	`,
	styles: [],
})
export default class GlossaryComponent {}
