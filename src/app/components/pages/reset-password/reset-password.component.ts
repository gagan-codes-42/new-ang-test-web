import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FbAuthService } from 'src/app/shared/services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private fbAuthSvc: FbAuthService,
    private toastSvc: ToastService,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  async resetPassword() {
    try {
      this.loading = true;
      await this.fbAuthSvc.resetPassword(
        this.resetPasswordForm.value.email || ''
      );
      this.toastSvc.showSuccessToast(
        'Reset Email Sent',
        'Please check your email'
      );
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);

      if (error.code) {
        switch (error.code) {
          case 'auth/user-not-found':
            this.toastSvc.showErrorToast(
              'Reset Failed',
              'Email is not registered'
            );
            break;
          case 'auth/invalid-email':
            this.toastSvc.showErrorToast('Reset Failed', 'Invalid Email');
            break;
          default:
            this.toastSvc.showErrorToast('Reset Failed', 'Some error occured');
            break;
        }
      } else {
        this.toastSvc.showErrorToast('Reset Failed', 'Some error occured');
      }
    } finally {
      this.loading = false;
    }
  }
}
