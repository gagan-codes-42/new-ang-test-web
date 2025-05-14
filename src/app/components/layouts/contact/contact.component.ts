import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  subscribeForm: FormGroup;
  constructor(
    private authSVC: AuthService,
    private fb: FormBuilder,
    private toastSVC: ToastService
  ) {
    this.subscribeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  subscribeNewsLetter() {
    if (this.subscribeForm.valid) {
      this.authSVC.subscribeData = this.subscribeForm.value;
      this.authSVC
        .subscribeNewsLetter(this.authSVC.subscribeData.email)
        .subscribe(
          (res) => {
            console.log(res);
            this.toastSVC.showSuccessToast(
              'Success',
              'Succesfully subscribed to newsletter'
            );
            this.subscribeForm.reset();
          },
          (err) => {
            console.log(err);
            this.toastSVC.showErrorToast('Error', 'Email not registered');
          }
        );
    }
  }
}
