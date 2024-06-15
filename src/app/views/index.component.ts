import { Component } from '@angular/core'
import { FormsModule, NgForm } from '@angular/forms'
import { RouterOutlet, RouterModule } from '@angular/router'
import { DBUIElementsModule } from '@db-ui/ngx-elements-enterprise/dist/lib'
import { TranslationService } from '../translation.service'
import { Language } from '../types'

@Component({
	selector: 'app-translate',
	standalone: true,
	imports: [RouterOutlet, RouterModule, DBUIElementsModule, FormsModule],
	template: `
		<form
			#f="ngForm"
			(ngSubmit)="onSubmit(f)"
			class="grid"
			[class.show-result]="showResult"
			style="grid-template-columns: 1fr 1fr; gap: 1.5rem 3rem;"
		>
			<db-select
				ngModel
				name="source_lang"
				label="Ausgangssprache"
				style="grid-column: 1"
			>
				<option selected value="">Automatisch erkennen</option>
				@for (lang of sourceLanguages; track lang) {
					<option [value]="lang.language">{{ lang.name }}</option>
				}
			</db-select>
			<db-select
				required
				ngModel
				name="target_lang"
				label="Zielsprache"
				style="grid-column: 2"
			>
				<option value="" selected disabled>Auswählen...</option>
				@for (lang of targetLanguages; track lang) {
					<option [value]="lang.language">{{ lang.name }}</option>
				}
			</db-select>
			<db-accordion summary="Erweiterte Optionen" style="grid-column: span 2;">
				<div class="flex accordion-row" style="gap: 1rem; margin-bottom: 1rem;">
					<span>Förmlichkeit:</span>
					<db-radio
						checked
						name="formality"
						label="Standard"
						value="default"
					></db-radio>
					<db-radio
						name="formality"
						label="Förmlicher"
						value="prefer_more"
					></db-radio>
					<db-radio
						name="formality"
						label="Weniger förmlich"
						value="prefer_less"
					></db-radio>

					<db-checkbox
						ngModel
						name="adjust_formatting"
						checked
						label="Format/Zeichensetzung anpassen"
					/>
				</div>

				<div style="margin-bottom: 1rem;">
					<db-toggle ngModel name="use_glossary" disabled>
						Glossar verwenden
					</db-toggle>
				</div>

				<db-textarea
					ngModel
					name="context"
					rows="3"
					label="Kontext für die Übersetzung (Alpha):"
				/>
			</db-accordion>

			<div
				class="text flex flex-column"
				style="height: clamp(275px, 50vh, 475px)"
			>
				<div class="flex items-center" style="gap: 0.5rem;">
					<db-headline variant="3" class="mr-auto">Ausgangstext</db-headline>
				</div>
				<db-textarea
					required
					(input)="f.controls['text'].setValue(getValue($event))"
					ngModel
					name="text"
					class="flex-grow"
					labelHidden
					label="Zu übersetzender Text"
				/>
			</div>
			<div
				class="result flex flex-column"
				style="height: clamp(275px, 50vh, 475px);"
			>
				<div class="flex items-center" style="gap: 0.5rem;">
					<db-headline variant="3" class="mr-auto">Resultat</db-headline>
					<db-button
						(click)="copyResult()"
						type="button"
						[attr.disabled]="!translationResult.length"
						size="small"
						[attr.icon]="copySuccess ? 'check-circle' : 'copy'"
						variant="secondary-solid"
					>
						Kopieren
					</db-button>
					<db-button
						routerLink="/history"
						[attr.disabled]="!translationResult.length"
						size="small"
						icon="link-external"
						type="button"
						icononly
						variant="secondary-solid"
					>
						Öffnen
					</db-button>
				</div>
				<p id="result">{{ translationResult }}</p>
			</div>
			<db-button
				[attr.disabled]="f.invalid"
				class="btn-translate"
				variant="brand-primary"
				type="submit"
			>
				Übersetzen
			</db-button>
			<db-button
				class="btn-new-translation"
				variant="primary"
				type="button"
				(click)="showResult = false"
			>
				Neue Übersetzung
			</db-button>
		</form>
	`,
	styles: [
		`
			:host ::ng-deep [data-label-hidden] {
				display: none;
			}
			:host ::ng-deep .elm-textarea {
				height: 100%;
			}

			#result {
				display: flex;
				margin: 0;
				overflow: auto;
				white-space: pre-line;
				flex-grow: 1;
			}

			#result:empty::before {
				content: '🗨️';
				font-size: 7rem;
				margin: auto;
			}

			.accordion-row {
				flex-direction: column;
			}
			.accordion-row :last-child {
				margin: 1rem 0 1rem 0;
			}

			.btn-new-translation,
			.btn-translate {
				justify-self: center;
				grid-column: span 2;
			}

			@media (min-width: 650px) {
				.btn-new-translation {
					display: none;
				}
				.accordion-row {
					flex-direction: row;
				}
				.accordion-row :last-child {
					margin: 0 0 0 auto;
				}
			}
			@media (max-width: 649px) {
				.text,
				.result {
					grid-column: span 2;
				}
				form.show-result .text,
				form:not(.show-result) .result,
				form:not(.show-result) .btn-new-translation,
				form.show-result .btn-translate {
					display: none;
				}
			}
		`,
	],
})
export default class TranslateComponent {
	translationResult = ''
	copySuccess = false

	sourceLanguages: Language[] = []
	targetLanguages: Language[] = []

	showResult = false

	constructor(private translation: TranslationService) {
		this.translation.getSourceLanguages().subscribe((result) => {
			this.sourceLanguages = result
		})
		this.translation.getTargetLanguages().subscribe((result) => {
			this.targetLanguages = result
		})
	}

	getValue(evt: Event) {
		return (evt.target as HTMLInputElement | HTMLTextAreaElement).value
	}

	copyResult() {
		navigator.clipboard.writeText(this.translationResult).then(() => {
			this.copySuccess = true
			setTimeout(() => (this.copySuccess = false), 1500)
		})
	}

	onSubmit(form: NgForm) {
		const { text, adjust_formatting, ...rest } = form.value

		const data = {
			...rest,
			preserve_formatting: adjust_formatting === false,
			text: [text],
		}

		this.translation.translate(data).subscribe(({ translations }) => {
			this.translationResult = translations[0].text
			this.showResult = true
		})
	}
}
