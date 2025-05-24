import { CommonModule } from "@angular/common";
import { Component, isDevMode, OnDestroy } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { RegistrationFormComponent } from "./app/components/registration-form/registration-form.component";
import { DotLoaderComponent } from "./app/components/dot-loader/dot-loader.component";
import { provideServiceWorker } from "@angular/service-worker";
import { AppUpdateService } from "./app/services/app-update.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RegistrationFormComponent, DotLoaderComponent],
  template: `
    @if (_appUpdateService.available$ | async) {
      <div class="msg-wrapper">
        A new version of this site is available.
        <a (click)="_appUpdateService.activateUpdate()" class="reload-link">Reload Now</a> to
        activate it.
      </div>
    }

    @if (showLoader) {
      <app-dot-loader class="loader-container"></app-dot-loader>
    } @else {
      <app-registration-form class="container"></app-registration-form>
    }
  `,
})
export class App implements OnDestroy {
  showLoader = true;
  onDestroy = new Subject<void>();

  constructor(readonly _appUpdateService: AppUpdateService) {
    setTimeout(() => {
      this.showLoader = false;
    }, 2000);

    this._appUpdateService.available$
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: any) => { console.log('App Update available? -> ', res); });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
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