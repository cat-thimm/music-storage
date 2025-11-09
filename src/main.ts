import * as Sentry from "@sentry/angular";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


Sentry.init({
    dsn: "https://ded76ca2d9fe84865a0c386f32f47794@o4510323588857856.ingest.de.sentry.io/4510323590824016",
    integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
    tracesSampleRate: 1,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1,
    enableLogs: true,
    sendDefaultPii: true
})


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));