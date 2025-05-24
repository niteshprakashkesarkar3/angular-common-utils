import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-success-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <div class="success-dialog">
      <div class="success-icon">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="24" fill="#00C853"/>
          <path d="M20.5 28.5L15 23L13 25L20.5 32.5L35.5 17.5L33.5 15.5L20.5 28.5Z" fill="white"/>
        </svg>
      </div>
      <h2 class="title">User updated successfully</h2>
      <div class="actions">
        <button mat-stroked-button color="primary" (click)="dismiss()">Dismiss</button>
      </div>
      <p class="auto-dismiss">Message will automatically dismiss in {{timeLeft}} seconds</p>
    </div>
  `,
  styles: [`
    .success-dialog {
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      min-width: 320px;
    }
    .success-icon {
      margin-bottom: 16px;
    }
    .title {
      color: #333;
      font-size: 20px;
      margin-bottom: 24px;
      font-weight: 500;
    }
    .actions {
      margin-bottom: 16px;
    }
    .auto-dismiss {
      color: #666;
      font-size: 14px;
      margin: 0;
    }
    button {
      min-width: 120px;
      border-color: #FF9800;
      color: #FF9800;
    }
  `]
})
export class SuccessDialogComponent {
  timeLeft = 5;

  constructor(
    public dialogRef: MatDialogRef<SuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.startCountdown();
  }

  dismiss(): void {
    this.dialogRef.close();
  }

  private startCountdown(): void {
    const timer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft === 0) {
        clearInterval(timer);
        this.dismiss();
      }
    }, 1000);
  }
}