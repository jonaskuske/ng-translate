import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal,
} from '@angular/core'
import { FormsModule, NgForm } from '@angular/forms'
import { RouterModule, Router } from '@angular/router'
import {
	DBButton,
	DBInput,
	DBSection,
	DBNotification,
} from '@db-ux/ngx-core-components'
import { SettingsService } from '../settings.service'
import { TranslationService } from '../translation.service'
import { HttpErrorResponse } from '@angular/common/http'

@Component({
	selector: 'app-auth',
	imports: [
		RouterModule,
		DBButton,
		DBInput,
		DBSection,
		FormsModule,
		DBNotification,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<db-section width="medium">
			<h1>Willkommen</h1>

			@if (errorMessage(); as message) {
				<db-notification
					data-density="functional"
					headline="Authentifizierung fehlgeschlagen"
					semantic="critical"
					variant="standalone"
					ariaLive="assertive"
					behavior="closable"
					(close)="errorMessage.set('')"
				>
					{{ message }}
				</db-notification>
			}

			<p>Speichere deinen API-Key, um zu beginnen.</p>

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
					variant="floating"
					label="API-Key"
					[required]="true"
					message="Kostenlos erhältlich unter deepl.com/your-account/keys"
					[validation]="!form.invalid ? 'no-validation' : undefined"
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
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		this.settings.apiKey.set(form.value?.api_key as string)

		const from = this.router.routerState.snapshot.root.queryParamMap.get('from')

		this.translations.getUsage().subscribe({
			next: () => {
				void this.router.navigateByUrl(from || '/', { replaceUrl: true })
			},
			error: (err: HttpErrorResponse) => {
				form.resetForm()

				if (err?.status === 401 || err?.status === 403) {
					this.errorMessage.set(
						`Bitte überprüfe deinen API-Key. (${err.status})`,
					)
				} else this.errorMessage.set('Bitte probiere es später erneut.')
			},
		})
	}
}
