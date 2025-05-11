import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomValidators } from '../../validators/validators.util';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  submitted = false;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 100); // 100 years ago
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 13); // Must be at least 13 years old

    this.registrationForm = this.fb.group({
      username: ['', [CustomValidators.required, CustomValidators.username]],
      firstName: [
        '',
        [
          CustomValidators.required,
          CustomValidators.minLength(2),
          CustomValidators.maxLength(50),
        ],
      ],
      lastName: [
        '',
        [
          CustomValidators.required,
          CustomValidators.minLength(2),
          CustomValidators.maxLength(50),
        ],
      ],
      email: ['', [CustomValidators.required, CustomValidators.email]],
      phone: ['', [CustomValidators.required, CustomValidators.phoneNumber]],
      age: [
        null,
        [CustomValidators.required, CustomValidators.numberRange(18, 120)],
      ],
      birthDate: [
        '',
        [
          CustomValidators.required,
          CustomValidators.dateRange(minDate, maxDate),
        ],
      ],
      password: [
        '',
        [
          CustomValidators.required,
          CustomValidators.minLength(8),
          CustomValidators.strongPassword,
        ],
      ],
      confirmPassword: [
        '',
        [CustomValidators.required, CustomValidators.mustMatch('password')],
      ],
      website: ['', [CustomValidators.url]],
      otp: ['', [CustomValidators.required, CustomValidators.otp(6, 6)]],
      // New address fields
      streetAddress: [
        '',
        [CustomValidators.required, CustomValidators.streetAddress],
      ],
      city: ['', [CustomValidators.required, CustomValidators.city]],
      state: ['', [CustomValidators.required, CustomValidators.state('US')]],
      zipCode: [
        '',
        [CustomValidators.required, CustomValidators.zipCode('US')],
      ],
      // Geographic location
      coordinates: ['', [CustomValidators.coordinates()]],
      // File upload
      profilePicture: [
        null,
        [
          CustomValidators.fileSize(1 * 1024 * 1024), // 1MB
          CustomValidators.fileType(['image/jpeg', 'image/png', 'image/gif']),
        ],
      ],
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      this.registrationForm.patchValue({
        profilePicture: this.selectedFile,
      });
    }
  }

  get f() {
    return this.registrationForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      return;
    }

    console.log('Form submitted successfully:', this.registrationForm.value);

    this.registrationForm.reset();
    this.submitted = false;
    this.selectedFile = null;
  }

  getErrorMessage(controlName: string): string {
    const control = this.registrationForm.get(controlName);
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    const errors = control.errors;

    if (errors['required']) {
      return 'This field is required';
    }

    if (errors['minLength']) {
      return `Minimum length is ${errors['minLength'].requiredLength} characters`;
    }

    if (errors['maxLength']) {
      return `Maximum length is ${errors['maxLength'].requiredLength} characters`;
    }

    if (errors['email']) {
      return 'Please enter a valid email address';
    }

    if (errors['min']) {
      return `Minimum value is ${errors['min'].min}`;
    }

    if (errors['max']) {
      return `Maximum value is ${errors['max'].max}`;
    }

    if (errors['notANumber']) {
      return 'Please enter a valid number';
    }

    if (errors['strongPassword']) {
      let message = 'Password must contain: ';
      const requirements = [];

      if (!errors['strongPassword'].hasUpperCase)
        requirements.push('uppercase letter');
      if (!errors['strongPassword'].hasLowerCase)
        requirements.push('lowercase letter');
      if (!errors['strongPassword'].hasNumber) requirements.push('number');
      if (!errors['strongPassword'].hasSpecialChar)
        requirements.push('special character');

      return message + requirements.join(', ');
    }

    if (errors['mustMatch']) {
      return 'Passwords do not match';
    }

    if (errors['username']) {
      return 'Username must be 3-20 characters and can only contain letters, numbers, underscores, and hyphens';
    }

    if (errors['phoneNumber']) {
      return 'Please enter a valid phone number';
    }

    if (errors['invalidDate']) {
      return 'Please enter a valid date';
    }

    if (errors['minDate']) {
      return 'Date is too far in the past';
    }

    if (errors['maxDate']) {
      return 'You must be at least 13 years old';
    }

    if (errors['url']) {
      return 'Please enter a valid URL';
    }

    if (errors['otp']) {
      if (errors['otp'].onlyDigits === false) {
        return 'OTP must contain only digits';
      }
      if (errors['otp'].tooShort) {
        return `OTP must be at least ${errors['otp'].minLength} digits`;
      }
      if (errors['otp'].tooLong) {
        return `OTP cannot be more than ${errors['otp'].maxLength} digits`;
      }
    }

    if (errors['streetAddress']) {
      return 'Please enter a valid street address';
    }

    if (errors['city']) {
      return 'Please enter a valid city name';
    }

    if (errors['state']) {
      return 'Please enter a valid state code';
    }

    if (errors['zipCode']) {
      return 'Please enter a valid ZIP code';
    }

    if (errors['coordinates']) {
      return 'Please enter valid coordinates (latitude,longitude)';
    }
    console.log(errors);
    if (errors['fileSize']) {
      return `File size must be less than ${
        errors['fileSize'].max / (1024 * 1024)
      }MB`;
    }

    if (errors['fileType']) {
      return `Allowed file types: ${errors['fileType'].allowed.join(', ')}`;
    }

    return 'Invalid input';
  }
}
