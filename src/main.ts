import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RegistrationFormComponent } from './app/components/registration-form/registration-form.component';
import { DotLoaderComponent } from './app/components/dot-loader/dot-loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RegistrationFormComponent, DotLoaderComponent],
  template: `
    @if(showLoader) {
      <app-dot-loader class="loader-container"></app-dot-loader>
    } @else {
      <div class="container">
        <h1 class="text-center">Angular Forms Validation Example</h1>
        <p class="text-center">This example demonstrates how to use custom validators with reactive forms in Angular</p>
        
        <app-registration-form></app-registration-form>
      </div>
    }
  `,
  styles: [
    `
    h1 {
      color: var(--primary-dark);
      margin-bottom: 16px;
      font-weight: 500;
    }
    
    p {
      color: #666;
      margin-bottom: 24px;
    }
    
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 24px;
    }

    .text-center {
      text-align:center !important;
    }

    .loader-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      width: 100vw;
    }
  `,
  ],
})
export class App {
  title = 'Angular Forms Validation';
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
