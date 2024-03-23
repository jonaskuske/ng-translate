import { Routes } from "@angular/router"

export const routes: Routes = [
	{
		path: "",
		title: "DeepL Translate",
		loadComponent: () => import("./views/index.component"),
	},
	{
		path: "history",
		title: "Verlauf",
		loadComponent: () => import("./views/history.component"),
	},
	{
		path: "settings",
		title: "Einstellungen",
		loadComponent: () => import("./views/settings.component"),
	},
	{
		path: "glossary",
		title: "Glossar",
		loadComponent: () => import("./views/glossary.component"),
	},
	{
		path: "imprint",
		title: "Impressum",
		loadComponent: () => import("./views/imprint.component"),
	},
	{
		path: "privacy",
		title: "Datenschutz",
		loadComponent: () => import("./views/privacy.component"),
	},
]
