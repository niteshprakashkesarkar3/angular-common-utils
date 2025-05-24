import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class AppUpdateService {
  constructor(private swUpdate: SwUpdate) {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe(evt => {
        if (evt.type === 'VERSION_READY') {
          // Simple confirm dialog for update
          const updateConfirmed = window.confirm(
            'A new version of the app is available. Would you like to update now?'
          );

          if (updateConfirmed) {
            this.swUpdate.activateUpdate().then(() => document.location.reload());
          }
        }
      });
    }
  }
}
