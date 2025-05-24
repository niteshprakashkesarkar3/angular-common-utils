import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { RegistrationFormComponent } from "./app/components/registration-form/registration-form.component";
import { DotLoaderComponent } from "./app/components/dot-loader/dot-loader.component";

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
  constructor() {
    setTimeout(() => {
      this.showLoader = false;
    }, 2000);
  }
}

bootstrapApplication(App, {
  providers: [],
});
