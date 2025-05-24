import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-wellness-score-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <div class="wellness-dialog">
      <button class="close-button" (click)="dismiss()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#666"/>
        </svg>
      </button>
      
      <div class="score-section">
        <div class="score-circle">
          <span class="score">70</span>
        </div>
        <h2 class="title">Wellness Score</h2>
      </div>

      <div class="content">
        <p class="description">
          The Wellness score is calculated using <strong>clinical factors</strong> (e.g. BMI, BP, glucose, cholesterol) 
          and <strong>lifestyle factors</strong> (e.g. steps, sleep, diet). It helps you understand how your lifestyle 
          affects your overall wellness, which areas you are doing well, and where you need to 
          work on to improve your health. Check with your healthcare provider if you are unsure 
          of what your Wellness Score means.
        </p>
      </div>
    </div>
  `,
  styles: [`
    .wellness-dialog {
      padding: 24px;
      position: relative;
      max-width: 600px;
    }

    .close-button {
      position: absolute;
      top: 16px;
      right: 16px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .close-button:hover {
      background: rgba(0, 0, 0, 0.04);
      border-radius: 50%;
    }

    .score-section {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
    }

    .score-circle {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: conic-gradient(#FF9800 70%, #E0E0E0 70%);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .score-circle::after {
      content: '';
      position: absolute;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: white;
    }

    .score {
      position: relative;
      z-index: 1;
      color: #FF9800;
      font-weight: 500;
      font-size: 18px;
    }

    .title {
      color: #333;
      font-size: 24px;
      font-weight: 500;
      margin: 0;
    }

    .content {
      padding: 0 8px;
    }

    .description {
      color: #666;
      font-size: 16px;
      line-height: 1.6;
      margin: 0;
    }

    strong {
      color: #333;
      font-weight: 500;
    }
  `]
})
export class WellnessScoreDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<WellnessScoreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  dismiss(): void {
    this.dialogRef.close();
  }
}