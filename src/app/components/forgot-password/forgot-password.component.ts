import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email: string = '';
  otp: string = '';
  otpSent: boolean = false;
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  correctOtp: string = '1234';

  constructor(private router: Router) { }

  sendOtp() {
    if (!this.email) {
      this.errorMessage = 'Please enter your email';
      return;
    }

    // API for sending OTP
    this.otpSent = true;
    this.errorMessage = '';
  }

  onSubmit() {
    this.errorMessage = '';

    if (this.otp !== this.correctOtp) {
      this.errorMessage = 'Invalid OTP. Please try again.';
      return;
    }

    if (!this.newPassword || !this.confirmPassword) {
      this.errorMessage = 'Please enter both passwords';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (this.newPassword.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters long';
      return;
    }

    // Call API to reset password
    console.log('Password reset successful');
    // Navigate to login or success page
    // this.router.navigate(['/login']);
  }
}
