import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal,
} from '@angular/core'
import { FormsModule, NgForm } from '@angular/forms'
import { RouterOutlet, RouterModule, Router } from '@angular/router'
import { SettingsService } from '../settings.service'
import { TranslationService } from '../translation.service'
import { CommonModule } from '@angular/common'
import {
	DBButton,
	DBInfotext,
	DBInput,
	DBNotification,
	DBRadio,
	DBSection,
	DBSwitch,
} from '@db-ux/ngx-core-components'
import { HistoryService } from '../history.service'
import { HttpErrorResponse } from '@angular/common/http'

@Component({
	selector: 'app-settings',
	standalone: true,
	imports: [
		RouterOutlet,
		RouterModule,
		FormsModule,
		CommonModule,
		DBButton,
		DBInput,
		DBSwitch,
		DBSection,
		DBRadio,
		DBNotification,
		DBInfotext,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<db-section width="medium" spacing="small">
			<h2>Aussehen</h2>

			<p>Farbschema wählen:</p>

			<div class="flex" style="gap: var(--db-spacing-fixed-md)">
				<db-radio
					[checked]="colorScheme() === 'light dark'"
					(change)="colorScheme.set('light dark')"
					name="color_scheme"
					value="auto"
				>
					Auto
				</db-radio>
				<db-radio
					[checked]="colorScheme() === 'light'"
					(change)="colorScheme.set('light')"
					name="color_scheme"
					value="light"
				>
					Hell
				</db-radio>
				<db-radio
					[checked]="colorScheme() === 'dark'"
					(change)="colorScheme.set('dark')"
					name="color_scheme"
					value="dark"
				>
					Dunkel
				</db-radio>
			</div>
		</db-section>

		<db-section width="medium" spacing="none">
			<h2>API-Key</h2>

			@if (errorMessage(); as message) {
				<db-notification
					data-density="functional"
					headline="Authentifizierung fehlgeschlagen"
					semantic="critical"
					variant="standalone"
					ariaLive="assertive"
					behavior="closable"
					(close)="errorMessage.set('')"
					style="margin-bottom: var(--db-spacing-responsive-2xs); display: block;"
				>
					{{ message }}
				</db-notification>
			}

			<db-infotext semantic="informational">
				Verbrauch:
				@if (getUsage$ | async; as usage) {
					{{ usage.character_count | number }} /
					{{ usage.character_limit | number }} Zeichen ({{
						usage.character_count / usage.character_limit | percent: '1.0-1'
					}})
				}
			</db-infotext>

			<form
				#form="ngForm"
				(ngSubmit)="onSubmit(form)"
				style="margin-top: var(--db-spacing-responsive-xs)"
			>
				<div style="margin-bottom: var(--db-spacing-fixed-md);">
					<db-input
						[required]="true"
						name="api_key"
						variant="floating"
						[ngModel]="apiKey()"
						autocomplete="off"
						type="password"
						label="API-Key"
						invalidMessage=" "
						validation="no-validation"
					/>
				</div>

				<div class="flex flex-wrap" style="gap: var(--db-spacing-fixed-md)">
					<db-button
						[disabled]="!!form.invalid || form.value.api_key === apiKey()"
						type="submit"
					>
						Key speichern
					</db-button>
				</div>
			</form>
		</db-section>

		<db-section width="medium" spacing="small">
			<h2>Zurücksetzen</h2>

			<p>Dein API-Key und alle Daten werden von diesem Gerät gelöscht.</p>

			<form (ngSubmit)="onReset()">
				<db-button type="submit"> Anwendung zurücksetzen </db-button>
			</form>
		</db-section>
	`,
})
export default class SettingsComponent {
	private readonly settings = inject(SettingsService)
	private readonly translations = inject(TranslationService)
	private readonly history = inject(HistoryService)
	private readonly router = inject(Router)

	readonly getUsage$ = this.translations.getUsage()

	readonly errorMessage = signal('')

	readonly apiKey = this.settings.apiKey.asReadonly()
	readonly colorScheme = this.settings.colorScheme

	onSubmit(form: NgForm) {
		const prevKey = this.apiKey()

		this.errorMessage.set('')
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		this.settings.apiKey.set(form.value.api_key as string)

		this.translations.getUsage().subscribe({
			error: (err: HttpErrorResponse) => {
				this.settings.apiKey.set(prevKey)

				if (err?.status === 401 || err?.status === 403) {
					this.errorMessage.set(
						`Der eingegebene API-Key ist ungültig und wurde nicht gespeichert. (${err.status})`,
					)
				} else this.errorMessage.set('Bitte probiere es später erneut.')
			},
		})
	}

	async onReset() {
		this.settings.reset()
		await this.history.reset()
		await this.router.navigateByUrl(this.router.routerState.snapshot.url, {
			replaceUrl: true,
		})
	}
}
