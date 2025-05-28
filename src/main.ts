import { bootstrapApplication } from '@angular/platform-browser'
import '@angular/common/locales/global/de'
import { appConfig } from './app/app.config'
import { AppComponent } from './app/app'

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err))
