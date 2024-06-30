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
	DBInput,
	DBNotification,
	DBRadio,
	DBSection,
	DBSwitch,
} from '@db-ui/ngx-components'

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
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<db-section width="medium">
			@if (errorMessage(); as message) {
				<db-notification
					data-density="functional"
					headline="Authentifizierung fehlgeschlagen"
					semantic="critical"
					variant="standalone"
					ariaLive="assertive"
					behaviour="closable"
					(onClose)="errorMessage.set('')"
				>
					{{ message }}
				</db-notification>
			}

			<h2>API Key</h2>

			<p>
				Verwendung:
				@if (getUsage$ | async; as usage) {
					{{ usage.character_count | number }} /
					{{ usage.character_limit | number }} Zeichen ({{
						usage.character_count / usage.character_limit | percent: '1.0-1'
					}})
				}
			</p>

			<form #form="ngForm" (ngSubmit)="onSubmit(form)">
				<div style="margin-bottom: var(--db-spacing-fixed-md);">
					<db-input
						[required]="true"
						name="api_key"
						[ngModel]="apiKey()"
						type="password"
						label="API Key"
						invalidMessage=" "
						customValidity="no-validation"
					/>
				</div>

				<div class="flex flex-wrap" style="gap: var(--db-spacing-fixed-md)">
					<db-button
						[disabled]="!!form.invalid || form.value.api_key === apiKey()"
						size="medium"
						variant="filled"
						type="submit"
					>
						API Key speichern
					</db-button>
					<db-button
						size="medium"
						variant="ghost"
						type="button"
						(click)="onReset(form)"
					>
						API Key zurücksetzen
					</db-button>
				</div>
			</form>
		</db-section>

		<db-section width="medium" spacing="none">
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
	`,
})
export default class SettingsComponent {
	private readonly settings = inject(SettingsService)
	private readonly translations = inject(TranslationService)
	private readonly router = inject(Router)

	readonly getUsage$ = this.translations.getUsage()

	readonly errorMessage = signal('')

	readonly apiKey = this.settings.apiKey.asReadonly()
	readonly colorScheme = this.settings.colorScheme

	onSubmit(form: NgForm) {
		const prevKey = this.apiKey()

		this.errorMessage.set('')
		this.settings.apiKey.set(form.value.api_key)

		this.translations.getUsage().subscribe({
			error: (err) => {
				this.settings.apiKey.set(prevKey)

				if (err?.status === 401 || err?.status === 403) {
					this.errorMessage.set(
						`Der eingegebene API Key ist ungültig und wurde nicht gespeichert. (${err.status})`,
					)
				} else this.errorMessage.set('Bitte probiere es später erneut.')
			},
		})
	}

	onReset(form: NgForm) {
		form.resetForm()
		this.settings.apiKey.set('')
		this.router.navigateByUrl(this.router.routerState.snapshot.url, {
			onSameUrlNavigation: 'reload',
			replaceUrl: true,
		})
	}
}
