<h1 align=center>ng-translate</h1>

<p align=center>🔤 b
frontend for the DeepL translation API, built to circumvent the character limit of the DeepL free plan and to experience with the DB UI design system.</p>

<br><br>

This project was built to circumvent the per-translation character limit of the DeepL free plan (which doesn't apply to the free API plan), experiment with the DB UI design system and try out some features of Angular 17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Deploy

You can use the provided Dockerfile to build a deployable image, based on Caddy Webserver. The provided Caddyfile takes care of proxying API requests to the right DeepL API endpoint.



