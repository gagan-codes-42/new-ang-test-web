import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  subscribeForm: FormGroup;

  year = new Date();
  constructor(  private authSVC: AuthService,
    private toastSVC: ToastService,
    private fb: FormBuilder,) {
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
