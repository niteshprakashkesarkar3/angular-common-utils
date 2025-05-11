import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RegistrationFormComponent],
  template: `
    <div class="container">
      <h1 class="text-center">Angular Forms Validation Example</h1>
      <p class="text-center">This example demonstrates how to use custom validators with reactive forms in Angular</p>
      
      <app-registration-form></app-registration-form>
    </div>
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
  `,
  ],
})
export class App {
  title = 'Angular Forms Validation';
}

bootstrapApplication(App, {
  providers: [],
});
