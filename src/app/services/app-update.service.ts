import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { SwUpdate, VersionReadyEvent } from "@angular/service-worker";
import { tap, shareReplay, interval, startWith, filter } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AppUpdateService {
  readonly available$ = this.updates.versionUpdates.pipe(
    filter((evt): evt is VersionReadyEvent => evt.type === "VERSION_READY"),
    tap((event: VersionReadyEvent) => {
      console.info(
        `App Update available: ${event.latestVersion.hash}. Current version: ${event.currentVersion.hash}.`
      );
    }),
    shareReplay(1)
  );

  constructor(private updates: SwUpdate, private router: Router) {
    console.log("App Update constructor");
    if ("serviceWorker" in navigator) {
      console.log("App Update serviceWorker is listening");
      interval(60 * 1000)
        .pipe(startWith(0))
        .subscribe(async () => {
          try {
            const res = await this.updates.checkForUpdate();
            console.log("App Update check result:", res);
          } catch (error) {
            console.error(error);
            console.log("App Update check failed:", error);
          }
        });
    }
  }

  async activateUpdate(): Promise<void> {
    try {
      await this.updates.activateUpdate();
    } catch (error) {
      console.error(error);
    } finally {
      this.router.navigate(["/"], { replaceUrl: true });
    }
  }
}
