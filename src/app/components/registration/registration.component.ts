import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  otpSent: boolean = false;
  otpVerified: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      otp: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });

    this.togglePasswordFields(false);
  }

  sendOtp() {
    if (this.email?.valid) {
      console.log('OTP sent to:', this.email?.value);
      this.otpSent = true;
    } else {
      this.email?.markAsTouched();
    }
  }

  verifyOtp() {
    if (this.otp?.value === '123456') { // for example only
      this.otpVerified = true;
      this.togglePasswordFields(true);
      console.log('OTP verified successfully');
    } else {
      console.log('Invalid OTP');
      this.otp?.setErrors({ invalidOtp: true });
    }
  }

  togglePasswordFields(show: boolean) {
    if (show) {
      this.registrationForm.get('password')?.enable();
      this.registrationForm.get('confirmPassword')?.enable();
    } else {
      this.registrationForm.get('password')?.disable();
      this.registrationForm.get('confirmPassword')?.disable();
    }
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.registrationForm.valid && this.otpVerified) {
      console.log(this.registrationForm.value);
    } else {
      this.markFormGroupTouched(this.registrationForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  get name() { return this.registrationForm.get('name'); }
  get email() { return this.registrationForm.get('email'); }
  get otp() { return this.registrationForm.get('otp'); }
  get password() { return this.registrationForm.get('password'); }
  get confirmPassword() { return this.registrationForm.get('confirmPassword'); }

  passwordsMatch(): boolean {
    return this.password?.value === this.confirmPassword?.value;
  }
}