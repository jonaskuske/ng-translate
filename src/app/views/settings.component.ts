import { Component } from '@angular/core'
import { FormsModule, NgForm } from '@angular/forms'
import { RouterOutlet, RouterModule, Router } from '@angular/router'
import { DBUIElementsModule } from '@db-ui/ngx-elements-enterprise/dist/lib'
import { SettingsService } from '../settings.service'
import { TranslationService } from '../translation.service'
import { tap } from 'rxjs'
import { UsageData } from '../types'
import { CommonModule } from '@angular/common'

@Component({
	selector: 'app-settings',
	standalone: true,
	imports: [
		RouterOutlet,
		RouterModule,
		DBUIElementsModule,
		FormsModule,
		CommonModule,
	],
	template: `
		<db-headline variant="2">API Key</db-headline>

		<p>
			Verwendung: {{ usageData.character_count | number }} /
			{{ usageData.character_limit | number }} Zeichen ({{
				usageData.character_count / usageData.character_limit | percent:'1.0-1'
			}})
		</p>

		<form (ngSubmit)="onSubmit(f)" #f="ngForm">
			<div style="margin-bottom: 1rem;">
				<db-input
					(input)="f.controls['api_key'].setValue(getValue($event))"
					required
					[ngModel]="storedKey"
					name="api_key"
					type="password"
					label="API Key"
				/>
			</div>

			<div class="flex" style="gap: 1rem">
				<db-button
					[attr.disabled]="f.form.invalid || f.value.api_key === storedKey"
					size="small"
					variant="primary"
					type="submit"
				>
					API Key speichern
				</db-button>
				<db-button
					size="small"
					variant="secondary-outline"
					type="button"
					(click)="onReset(f)"
				>
					API Key zurücksetzen
				</db-button>
			</div>
		</form>

		<db-headline variant="2">Aussehen</db-headline>
		<db-toggle disabled>
			Dunkler Modus <span style="font-size:10px">(bald verfügbar)</span>
		</db-toggle>
	`,
	styles: [
		`
			:host ::ng-deep .elm-label.sc-db-input {
				max-width: calc(100% - 1rem);
			}
		`,
	],
})
export default class SettingsComponent {
	usageData: UsageData = { character_count: 0, character_limit: 0 }

	constructor(
		private settings: SettingsService,
		private translations: TranslationService,
		private router: Router,
	) {
		this.translations.getUsage().subscribe((result) => {
			this.usageData = result
		})
	}

	getValue = (evt: Event) => (evt.target as HTMLInputElement).value

	get storedKey() {
		return this.settings.apiKey
	}

	onReset(form: NgForm) {
		form.resetForm()
		this.settings.apiKey = ''
		this.router.navigateByUrl(this.router.routerState.snapshot.url, {
			onSameUrlNavigation: 'reload',
			replaceUrl: true,
		})
	}

	onSubmit(form: NgForm) {
		const prevKey = this.storedKey
		this.settings.apiKey = form.value.api_key
		this.translations
			.getUsage()
			.pipe(tap({ error: (err) => (this.settings.apiKey = prevKey) }))
			.subscribe()
	}
}
