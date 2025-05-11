import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export class CustomValidators {
  static required(control: AbstractControl): ValidationErrors | null {
    return control.value === null ||
      control.value === undefined ||
      control.value === ''
      ? { required: true }
      : null;
  }

  static minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || typeof control.value !== 'string') {
        return null;
      }

      return control.value.length < minLength
        ? {
            minLength: {
              requiredLength: minLength,
              actualLength: control.value.length,
            },
          }
        : null;
    };
  }

  static maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || typeof control.value !== 'string') {
        return null;
      }

      return control.value.length > maxLength
        ? {
            maxLength: {
              requiredLength: maxLength,
              actualLength: control.value.length,
            },
          }
        : null;
    };
  }

  static email(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(control.value) ? null : { email: true };
  }

  static pattern(pattern: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      return pattern.test(control.value)
        ? null
        : { pattern: { requiredPattern: pattern.toString() } };
    };
  }

  static strongPassword(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(control.value);
    const hasLowerCase = /[a-z]/.test(control.value);
    const hasNumber = /[0-9]/.test(control.value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
      control.value
    );

    const passwordValid =
      hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

    return passwordValid
      ? null
      : {
          strongPassword: {
            hasUpperCase,
            hasLowerCase,
            hasNumber,
            hasSpecialChar,
          },
        };
  }

  static mustMatch(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) {
        return null;
      }

      const sourceControl = control.parent.get(matchTo);

      if (!sourceControl || sourceControl.value !== control.value) {
        return { mustMatch: true };
      }

      return null;
    };
  }

  static numberRange(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || control.value === '') {
        return null;
      }

      const value = Number(control.value);

      if (isNaN(value)) {
        return { notANumber: true };
      }

      if (value < min) {
        return { min: { min, actual: value } };
      }

      if (value > max) {
        return { max: { max, actual: value } };
      }

      return null;
    };
  }

  static differentPassword(oldPasswordField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) {
        return null;
      }

      const oldPassword = control.parent.get(oldPasswordField);

      if (!oldPassword || oldPassword.value !== control.value) {
        return null;
      }

      return { sameAsOld: true };
    };
  }

  static otp(minLength: number = 4, maxLength: number = 6): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const value = control.value.toString();

      // Check if the value contains only digits
      if (!/^\d+$/.test(value)) {
        return { otp: { onlyDigits: false } };
      }

      // Check length constraints
      if (value.length < minLength) {
        return {
          otp: {
            tooShort: true,
            minLength,
            actualLength: value.length,
          },
        };
      }

      if (value.length > maxLength) {
        return {
          otp: {
            tooLong: true,
            maxLength,
            actualLength: value.length,
          },
        };
      }

      return null;
    };
  }

  static phoneNumber(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(control.value) ? null : { phoneNumber: true };
  }

  static username(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    return usernameRegex.test(control.value) ? null : { username: true };
  }

  static dateRange(minDate?: Date, maxDate?: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const date = new Date(control.value);

      if (isNaN(date.getTime())) {
        return { invalidDate: true };
      }

      if (minDate && date < minDate) {
        return { minDate: { min: minDate, actual: date } };
      }

      if (maxDate && date > maxDate) {
        return { maxDate: { max: maxDate, actual: date } };
      }

      return null;
    };
  }

  static url(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    try {
      const urlString = control.value.toLowerCase().trim();

      // Check if the URL has a valid protocol
      if (
        !urlString.startsWith('http://') &&
        !urlString.startsWith('https://')
      ) {
        return { url: true };
      }

      const url = new URL(urlString);

      // Special handling for localhost
      if (url.hostname === 'localhost') {
        // Valid localhost URL
        return null;
      }

      // For non-localhost URLs, check if the hostname has at least one dot and valid TLD
      const parts = url.hostname.split('.');
      if (parts.length < 2 || parts[parts.length - 1].length < 2) {
        return { url: true };
      }

      // Check if the hostname contains only valid characters
      if (!/^[a-z0-9.-]+$/.test(url.hostname)) {
        return { url: true };
      }

      return null;
    } catch {
      return { url: true };
    }
  }

  static creditCard(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const value = control.value.replace(/\D/g, '');

    if (!/^\d{13,19}$/.test(value)) {
      return { creditCard: true };
    }

    let sum = 0;
    let isEven = false;

    for (let i = value.length - 1; i >= 0; i--) {
      let digit = parseInt(value[i], 10);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0 ? null : { creditCard: true };
  }

  static coordinates(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const [lat, lng] = control.value.split(',').map(Number);

      if (isNaN(lat) || isNaN(lng)) {
        return { coordinates: true };
      }

      if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        return { coordinates: true };
      }

      return null;
    };
  }

  static zipCode(countryCode: string = 'US'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const patterns: { [key: string]: RegExp } = {
        US: /^\d{5}(-\d{4})?$/,
        CA: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
        UK: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,
      };

      const pattern = patterns[countryCode];
      if (!pattern) {
        return { unsupportedCountry: true };
      }

      return pattern.test(control.value) ? null : { zipCode: true };
    };
  }

  static fileSize(maxSize: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || !(control.value instanceof File)) {
        return null;
      }

      const file = control.value as File;
      return file.size > maxSize
        ? { fileSize: { max: maxSize, actual: file.size } }
        : null;
    };
  }

  static fileType(allowedTypes: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || !(control.value instanceof File)) {
        return null;
      }

      const file = control.value as File;
      const fileType = file.type;

      return !allowedTypes.includes(fileType)
        ? { fileType: { allowed: allowedTypes, actual: fileType } }
        : null;
    };
  }

  static streetAddress(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const value = control.value.trim();

    // Basic street address validation
    if (value.length < 5) {
      return { streetAddress: true };
    }

    // Must contain numbers and letters
    if (!/\d/.test(value) || !/[a-zA-Z]/.test(value)) {
      return { streetAddress: true };
    }

    return null;
  }

  static state(countryCode: string = 'US'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const value = control.value.toUpperCase();

      const patterns: { [key: string]: RegExp } = {
        US: /^[A-Z]{2}$/,
        CA: /^[A-Z]{2}$/,
        AU: /^[A-Z]{2,3}$/,
      };

      const pattern = patterns[countryCode];
      if (!pattern) {
        return { unsupportedCountry: true };
      }

      return pattern.test(value) ? null : { state: true };
    };
  }

  static city(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const value = control.value.trim();

    // City name validation
    if (value.length < 2) {
      return { city: true };
    }

    // Must contain only letters, spaces, hyphens, and apostrophes
    if (!/^[a-zA-Z\s'-]+$/.test(value)) {
      return { city: true };
    }

    return null;
  }
}
