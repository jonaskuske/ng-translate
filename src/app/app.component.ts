import { Component } from "@angular/core"
import { RouterOutlet, RouterModule } from "@angular/router"
import { DBUIElementsModule } from "@db-ui/ngx-elements-enterprise/dist/lib"

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet, RouterModule, DBUIElementsModule],
	template: `
		<db-page>
			<db-header slot="header">
				<db-brand src="/assets/images/logo.svg">DeepL Translate</db-brand>
				<db-mainnavigation>
					<li>
						<db-link
							routerLinkActive
							#home="routerLinkActive"
							[routerLinkActiveOptions]="{ exact: true }"
							[attr.current]="home.isActive ? 'page' : 'false'"
						>
							<a routerLink="/">Übersetzer</a>
						</db-link>
					</li>
					<li>
						<db-link
							routerLinkActive
							#history="routerLinkActive"
							[attr.current]="history.isActive ? 'page' : 'false'"
						>
							<a routerLink="/history">Verlauf</a>
						</db-link>
					</li>
					<li>
						<db-link
							routerLinkActive
							#glossary="routerLinkActive"
							[attr.current]="glossary.isActive ? 'page' : 'false'"
						>
							<a routerLink="/glossary">Glossar</a>
						</db-link>
					</li>
					<li>
						<db-link
							routerLinkActive
							#settings="routerLinkActive"
							[attr.current]="settings.isActive ? 'page' : 'false'"
						>
							<a [routerLink]="'/settings'">Einstellungen</a>
						</db-link>
					</li>
				</db-mainnavigation>
			</db-header>

			<div style="padding: 2rem 1rem;">
				<router-outlet />
			</div>

			<db-footer slot="footer" copyright border>
				<db-metanavigation style="margin-left: auto;">
					<db-link
						routerLinkActive
						#imprint="routerLinkActive"
						[attr.current]="imprint.isActive ? 'page' : 'false'"
					>
						<a [routerLink]="'/imprint'">Impressum</a>
					</db-link>
					<db-link
						routerLinkActive
						#privacy="routerLinkActive"
						[attr.current]="privacy.isActive ? 'page' : 'false'"
					>
						<a [routerLink]="'/privacy'">Datenschutz</a>
					</db-link>
				</db-metanavigation>
			</db-footer>
		</db-page>
	`,
	styles: [
		`
			:host ::ng-deep .cmp-accordion {
				padding-right: 0;
			}
		`,
	],
})
export class AppComponent {
	title = "DeepL Translate"
}
