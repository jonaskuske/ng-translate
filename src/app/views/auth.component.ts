import { Component, inject, signal } from '@angular/core'
import { FormsModule, NgForm } from '@angular/forms'
import { RouterOutlet, RouterModule, Router } from '@angular/router'
import {
	DBButton,
	DBInput,
	DBSection,
	DBNotification,
} from '@db-ui/ngx-components'
import { SettingsService } from '../settings.service'
import { TranslationService } from '../translation.service'

@Component({
	selector: 'app-auth',
	standalone: true,
	imports: [
		RouterOutlet,
		RouterModule,
		DBButton,
		DBInput,
		DBSection,
		FormsModule,
		DBNotification,
	],
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

			<h1>Willkommen</h1>

			<p>Speichere deinen API Key, um zu beginnen.</p>

			<form
				#form="ngForm"
				(ngSubmit)="onSubmit(form)"
				style="gap: var(--db-spacing-fixed-lg)"
				class="flex flex-column"
			>
				<db-input
					type="password"
					ngModel
					name="api_key"
					label="API Key"
					[required]="true"
					icon="key"
					message="Kostenlos erhältlich unter deepl.com/your-account/keys"
					[customValidity]="!form.invalid ? 'no-validation' : undefined"
					invalidMessage="Bitte gebe einen gültigen Key ein."
					autocomplete="off"
				/>
				<db-button [disabled]="!!form.invalid" variant="brand" type="submit">
					Bestätigen
				</db-button>
			</form>
		</db-section>
	`,
})
export default class AuthComponent {
	private readonly settings = inject(SettingsService)
	private readonly router = inject(Router)
	private readonly translations = inject(TranslationService)

	readonly errorMessage = signal<string>('')

	onSubmit(form: NgForm) {
		this.errorMessage.set('')
		this.settings.apiKey.set(form.value.api_key)

		const from = this.router.routerState.snapshot.root.queryParamMap.get('from')

		this.translations.getUsage().subscribe({
			next: () => this.router.navigateByUrl(from || '/', { replaceUrl: true }),
			error: (err) => {
				form.resetForm()

				if (err?.status === 401 || err?.status === 403) {
					this.errorMessage.set(
						`Bitte überprüfe deinen API Key. (${err.status})`,
					)
				} else this.errorMessage.set('Bitte probiere es später erneut.')
			},
		})
	}
}
