import { Component } from "@angular/core"
import { FormsModule, NgForm } from "@angular/forms"
import { RouterOutlet, RouterModule, Router, ActivatedRoute } from "@angular/router"
import { DBUIElementsModule } from "@db-ui/ngx-elements-enterprise/dist/lib"
import { SettingsService } from "../settings.service"
import { TranslationService } from "../translation.service"
import { tap } from "rxjs"

@Component({
	selector: "app-auth",
	standalone: true,
	imports: [RouterOutlet, RouterModule, DBUIElementsModule, FormsModule],
	template: `
		<db-headline pulse variant="1">Willkommen</db-headline>
		<p>Speichere deinen API Key, um zu beginnen.</p>
		<form #f="ngForm" (ngSubmit)="onSubmit(f)" style="gap: 1rem" class="flex flex-column">
			<db-input
				(input)="f.controls['api_key'].setValue(getValue($event))"
				type="password"
				required
				ngModel
				name="api_key"
				label="API Key"
			/>
			<db-button [attr.disabled]="f.invalid" variant="primary" type="submit">Bestätigen</db-button>
		</form>
	`,
	styles: [],
})
export default class AuthComponent {
	constructor(
		private settings: SettingsService,
		private router: Router,
		private translations: TranslationService,
	) {}

	onSubmit(form: NgForm) {
		this.settings.apiKey = form.value.api_key

		const from = this.router.routerState.snapshot.root.queryParamMap.get("from")

		this.translations
			.getUsage()
			.pipe(
				tap({
					next: (value) => {
						this.router.navigateByUrl(from || "/", { replaceUrl: true })
					},
					error: (err) => {
						form.resetForm()
					},
				}),
			)
			.subscribe()
	}

	getValue(evt: Event) {
		return (evt.target as HTMLInputElement | HTMLTextAreaElement).value
	}
}
