import { Component } from "@angular/core"
import { FormsModule, NgForm } from "@angular/forms"
import { RouterOutlet, RouterModule } from "@angular/router"
import { DBUIElementsModule } from "@db-ui/ngx-elements-enterprise/dist/lib"

@Component({
	selector: "app-settings",
	standalone: true,
	imports: [RouterOutlet, RouterModule, DBUIElementsModule, FormsModule],
	template: `
		<db-headline variant="2">API Key</db-headline>
		<form (ngSubmit)="onSubmit(f)" #f="ngForm">
			<div style="margin-bottom: 1rem;">
				<db-input
					(input)="f.controls['api_key'].setValue(getValue($event))"
					required
					ngModel
					name="api_key"
					label="API Key"
				/>
			</div>

			<div class="flex" style="gap: 1rem">
				<db-button [attr.disabled]="f.form.invalid" size="small" variant="primary" type="submit">
					API Key speichern
				</db-button>
				<db-button size="small" variant="secondary-outline" type="button" (click)="onReset(f)">
					API Key zurücksetzen
				</db-button>
			</div>
		</form>

		<db-headline variant="2">Aussehen</db-headline>
		<db-toggle disabled>
			Dunkler Modus <span style="font-size:10px">(bald verfügbar)</span></db-toggle
		>
	`,
	styles: [],
})
export default class SettingsComponent {
	getValue = (evt: Event) => (evt.target as HTMLInputElement).value

	onReset(form: NgForm) {
		form.resetForm()
	}

	onSubmit(form: NgForm) {
		console.log(form)
	}
}
