import { Component } from "@angular/core"
import { RouterOutlet, RouterModule } from "@angular/router"
import { DBUIElementsModule } from "@db-ui/ngx-elements-enterprise/dist/lib"

@Component({
	selector: "app-privacy",
	standalone: true,
	imports: [RouterOutlet, RouterModule, DBUIElementsModule],
	template: `
		<db-headline pulse variant="1">Datenschutz</db-headline>
		<p>
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam expedita at aliquam, vero
			delectus libero error repellat corporis, nisi magnam animi sapiente adipisci quidem voluptas
			reiciendis sint dolores quos exercitationem?
		</p>
		<p>
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea earum sint iure qui quaerat
			quidem, soluta doloremque expedita suscipit modi laboriosam magnam laudantium neque delectus
			et facere. A, pariatur necessitatibus.
		</p>
		<db-headline variant="2">Cookies</db-headline>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi adipisci dolorum incidunt
			doloribus, harum at repellat! Facilis quo blanditiis, molestiae quam nisi laborum sint
			perspiciatis doloremque, deserunt voluptates, tempore harum.
		</p>
		<p>
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa reprehenderit alias autem harum
			omnis et nisi inventore libero voluptatibus quasi. Molestias laboriosam excepturi consequuntur
			reprehenderit, dolorum minima cumque tempora dicta!
		</p>
	`,
	styles: [],
})
export default class PrivacyComponent {
	title = "Privacy"
}
