import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal,
} from '@angular/core'
import {
	FormBuilder,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms'
import { RouterOutlet, RouterModule } from '@angular/router'
import { TranslationService } from '../translation.service'
import {
	DBAccordion,
	DBAccordionItem,
	DBButton,
	DBCheckbox,
	DBRadio,
	DBSection,
	DBSelect,
	DBSwitch,
	DBTextarea,
} from '@db-ui/ngx-components'
import { CommonModule } from '@angular/common'
import { Formality, TranslationData } from '../types'

const SOURCE_LANG_AUTO = '_auto_'

@Component({
	selector: 'app-translate',
	standalone: true,
	imports: [
		CommonModule,
		RouterOutlet,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		DBSection,
		DBSelect,
		DBRadio,
		DBCheckbox,
		DBTextarea,
		DBButton,
		DBAccordion,
		DBAccordionItem,
		DBSwitch,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<db-section width="large">
			<form
				[formGroup]="form"
				(ngSubmit)="onSubmit()"
				class="grid"
				[class.show-result]="showResult()"
				style="grid-template-columns: 1fr 1fr; gap: var(--db-spacing-responsive-xs) var(--db-spacing-responsive-2xs);"
			>
				<db-select
					formControlName="source_lang"
					label="Ausgangssprache"
					style="grid-column: 1"
				>
					<option value="_auto_">Automatisch erkennen</option>
					@for (lang of getSourceLanguages$ | async; track lang.language) {
						<option [value]="lang.language">{{ lang.name }}</option>
					}
				</db-select>
				<db-select
					formControlName="target_lang"
					label="Zielsprache"
					[required]="true"
					style="grid-column: 2"
					customValidity="no-validation"
					invalidMessage=" "
				>
					@for (lang of getTargetLanguages$ | async; track lang.language) {
						<option [value]="lang.language">{{ lang.name }}</option>
					}
				</db-select>

				<db-accordion
					variant="card"
					style="display: block; grid-column: span 2;"
				>
					<db-accordion-item headlinePlain="Erweiterte Optionen">
						<div
							class="flex accordion-row"
							style="gap: var(--db-spacing-fixed-md); margin-bottom: var(--db-spacing-fixed-md);"
						>
							<span>Förmlichkeit:</span>
							<db-radio
								[checked]="formality() === 'default'"
								(change)="formality.set('default')"
								name="formality"
								label="Standard"
								value="default"
							></db-radio>
							<db-radio
								[checked]="formality() === 'prefer_more'"
								(change)="formality.set('prefer_more')"
								name="formality"
								label="Förmlicher"
								value="prefer_more"
							></db-radio>
							<db-radio
								[checked]="formality() === 'prefer_less'"
								(change)="formality.set('prefer_less')"
								name="formality"
								label="Weniger förmlich"
								value="prefer_less"
							></db-radio>

							<db-checkbox
								formControlName="adjust_formatting"
								label="Format/Zeichensetzung anpassen"
							/>
						</div>

						<div style="margin-bottom: var(--db-spacing-responsive-xs);">
							<db-switch formControlName="use_glossary">
								Glossar verwenden
							</db-switch>
						</div>

						<db-textarea
							formControlName="context"
							label="Kontext für die Übersetzung"
							[rows]="3"
						/>
					</db-accordion-item>
				</db-accordion>

				<div
					class="text flex flex-column"
					style="height: clamp(275px, 50vh, 475px)"
				>
					<div
						class="flex items-center"
						style="gap: var(--db-spacing-fixed-xs);"
					>
						<h3 class="mr-auto">Ausgangstext</h3>
					</div>
					<db-textarea
						formControlName="text"
						[required]="true"
						(input)="form.controls['text'].setValue($event.target.value)"
						label="Zu übersetzender Text"
						variant="hidden"
						invalidMessage=" "
						customValidity="no-validation"
					/>
				</div>
				<div
					class="result flex flex-column"
					style="height: clamp(275px, 50vh, 475px);"
				>
					<div
						class="flex items-center"
						style="gap: var(--db-spacing-fixed-xs);"
					>
						<h3 class="mr-auto">Resultat</h3>
						<db-button
							(click)="copyResult()"
							type="button"
							[disabled]="!translationResult().length"
							size="medium"
							[icon]="copySuccess() ? 'check' : 'copy'"
							variant="filled"
						>
							Kopieren
						</db-button>
						<db-button
							[noText]="true"
							routerLink="/history"
							[disabled]="!translationResult().length"
							size="medium"
							icon="arrow_up_right"
							type="button"
							variant="filled"
						>
							Öffnen
						</db-button>
					</div>
					<p id="result">{{ translationResult() }}</p>
				</div>
				<db-button
					[disabled]="!!form.invalid"
					class="btn-translate"
					variant="brand"
					type="submit"
				>
					Übersetzen
				</db-button>
				<db-button
					class="btn-new-translation"
					variant="filled"
					type="button"
					(click)="showResult.set(false)"
				>
					Neue Übersetzung
				</db-button>
			</form>
		</db-section>
	`,
	styles: [
		`
			:host ::ng-deep .db-textarea {
				flex-grow: 1;
			}
			:host ::ng-deep textarea {
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
				display: block;
				margin: 1rem 0 1rem 0;
			}

			.btn-new-translation,
			.btn-translate {
				display: block;
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
	private readonly translation = inject(TranslationService)

	readonly getSourceLanguages$ = this.translation.getSourceLanguages()
	readonly getTargetLanguages$ = this.translation.getTargetLanguages()

	readonly showResult = signal(false)
	readonly translationResult = signal('')
	readonly copySuccess = signal(false)

	readonly formality = signal<Formality>('default')
	readonly form = inject(FormBuilder).nonNullable.group({
		text: ['', Validators.required],
		source_lang: [SOURCE_LANG_AUTO],
		target_lang: ['', Validators.required],
		context: [''],
		adjust_formatting: [true],
		use_glossary: [{ value: undefined, disabled: true }],
	})

	copyResult() {
		void navigator.clipboard.writeText(this.translationResult()).then(() => {
			this.copySuccess.set(true)
			setTimeout(() => this.copySuccess.set(false), 1500)
		})
	}

	onSubmit() {
		const { text, source_lang, adjust_formatting, ...formValue } =
			this.form.getRawValue()

		const data = {
			text: [text],
			source_lang: source_lang === SOURCE_LANG_AUTO ? undefined : source_lang,
			preserve_formatting: adjust_formatting === false,
			formality: this.formality(),
			...formValue,
		} satisfies TranslationData

		this.translation.translate(data).subscribe(({ translations }) => {
			this.translationResult.set(translations[0].text)
			this.showResult.set(true)
		})
	}
}
