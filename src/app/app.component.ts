import {
	ChangeDetectionStrategy,
	Component,
	effect,
	inject,
	signal,
} from '@angular/core'
import { RouterOutlet, RouterModule } from '@angular/router'
import {
	DBBrand,
	DBHeader,
	DBNavigation,
	DBNavigationItem,
	NavigationContentDirective,
	NavigationDirective,
	MetaNavigationDirective,
} from '@db-ux/ngx-core-components'
import { SettingsService } from './settings.service'

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		RouterOutlet,
		RouterModule,
		DBHeader,
		DBBrand,
		DBNavigation,
		DBNavigationItem,
		NavigationDirective,
		NavigationContentDirective,
		MetaNavigationDirective,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="db-page" data-variant="fixed" data-fade-in="true">
			<db-header [drawerOpen]="drawerOpen()" (toggle)="toggle($event)">
				<db-brand brand [hideLogo]="true">Translate</db-brand>
				<ng-container *dbMetaNavigation>
					<a
						routerLink="/imprint"
						routerLinkActive
						ariaCurrentWhenActive="page"
						(click)="drawerOpen.set(false)"
					>
						Impressum
					</a>
					<a
						routerLink="/privacy"
						routerLinkActive
						ariaCurrentWhenActive="page"
						(click)="drawerOpen.set(false)"
					>
						Datenschutz
					</a>
				</ng-container>
				<db-navigation *dbNavigation>
					<db-navigation-item>
						<ng-container *dbNavigationContent>
							<a
								routerLink="/"
								routerLinkActive
								ariaCurrentWhenActive="page"
								[routerLinkActiveOptions]="{ exact: true }"
							>
								Übersetzer
							</a>
						</ng-container>
					</db-navigation-item>
					<db-navigation-item>
						<ng-container *dbNavigationContent>
							<a
								routerLink="/history"
								routerLinkActive
								ariaCurrentWhenActive="page"
							>
								Verlauf
							</a>
						</ng-container>
					</db-navigation-item>
					<db-navigation-item>
						<ng-container *dbNavigationContent>
							<a
								routerLink="/glossary"
								routerLinkActive
								ariaCurrentWhenActive="page"
							>
								Glossar
							</a>
						</ng-container>
					</db-navigation-item>
					<db-navigation-item>
						<ng-container *dbNavigationContent>
							<a
								routerLink="/settings"
								routerLinkActive
								ariaCurrentWhenActive="page"
							>
								Einstellungen
							</a>
						</ng-container>
					</db-navigation-item>
				</db-navigation>
			</db-header>

			<main class="db-main" style="scrollbar-gutter: stable both-edges;">
				<router-outlet />
			</main>
		</div>
	`,
	styles: [
		`
			.db-page {
				--db-drawer-max-width: 325px;
			}
		`,
	],
})
export class AppComponent {
	readonly drawerOpen = signal(false)
	readonly colorScheme = inject(SettingsService).colorScheme.asReadonly()

	toggle(open: boolean) {
		this.drawerOpen.set(open)
	}

	constructor() {
		effect(() => {
			const meta = document.head.querySelector<HTMLMetaElement>(
				'meta[name="color-scheme"]',
			)
			if (meta) meta.content = this.colorScheme()
		})
	}
}
