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
				<db-brand src="/assets/images/logo.svg">Translate</db-brand>
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

			<div class="flex flex-column outlet-container">
				<router-outlet />
			</div>

			<db-footer slot="footer" border>
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

			.outlet-container {
				padding: 2.5rem 1rem 0;
			}
			@media (min-width: 1090px) {
				.outlet-container {
					padding: 0;
				}
			}
		`,
	],
})
export class AppComponent {}
