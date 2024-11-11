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
  showSetPassword: boolean = false;
  newPassword = '';
  confirmPassword = '';
  correctOtp = '1234';

  constructor(private router: Router) { }

  sendOtp() {
    if (this.email) {
      this.otpSent = true;
    } else {
      alert('Please enter your email');
    }
  }

  verifyOtp() {
    if (this.otp === this.correctOtp) {
      this.showSetPassword = true;
    } else {
      alert('Invalid OTP. Please try again.');
    }
  }

  onNewPasswordInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.newPassword = input.value;
  }

  onConfirmPasswordInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.confirmPassword = input.value;
  }

  onSubmit() {
    if (this.newPassword === this.confirmPassword) {
      console.log('Password reset confirmed');
    } else {
      console.log('Passwords do not match');
    }
  }
}
