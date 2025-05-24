import { CommonModule } from "@angular/common";
import { Component, isDevMode } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { RegistrationFormComponent } from "./app/components/registration-form/registration-form.component";
import { DotLoaderComponent } from "./app/components/dot-loader/dot-loader.component";
import { provideServiceWorker } from "@angular/service-worker";
import { AppUpdateService } from "./app/services/app-update.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RegistrationFormComponent, DotLoaderComponent],
  template: `
    @if(showLoader) {
    <app-dot-loader class="loader-container"></app-dot-loader>
    } @else {
    <app-registration-form class="container"></app-registration-form>

    }
  `,
})
export class App {
  showLoader = true;
  constructor(private readonly _appUpdateService: AppUpdateService) {
    setTimeout(() => {
      this.showLoader = false;
    }, 2000);
  }
}

bootstrapApplication(App, {
  providers: [
    provideServiceWorker("ngsw-worker.js", {
      enabled: !isDevMode(),
      registrationStrategy: "registerWhenStable:30000",
    }),
  ],
});
