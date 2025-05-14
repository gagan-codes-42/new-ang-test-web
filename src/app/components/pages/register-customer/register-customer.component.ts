import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { FbAuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.scss']
})
export class RegisterCustomerComponent implements OnInit {
  faHome = faHome;
  registerForm: FormGroup;

  titles = ['Mr.', 'Ms.', 'Mrs.'];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authSvc: AuthService,
    private fbAuthSvc: FbAuthService
  ) {
    this.registerForm = this.fb.group({
      title: ['', [Validators.required]],
      firstName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z]+$'),
          Validators.maxLength(15),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z]+$'),
          Validators.maxLength(15),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.email],
        this.validateEmailNotTaken.bind(this),
      ],
    });
  }

  ngOnInit(): void {}

  startRegistration() {
    if (this.registerForm.valid) {
      this.authSvc.registrationInfo = this.registerForm.value;
      this.router.navigate(['reg-cust-otp']);
    }
  }

  onClickClose() {
    this.router.navigate(['']);
  }

  showError(fieldName: string) {
    return (
      this.registerForm.get(fieldName)?.invalid &&
      (this.registerForm.get(fieldName)?.touched ||
        this.registerForm.get(fieldName)?.dirty)
    );
  }

  async validateEmailNotTaken(control: AbstractControl) {
    try {
      const res = await this.fbAuthSvc.getSignInMethods(control.value);
      return res.length ? { emailTaken: true } : null;
    } catch (e) {
      console.log(e);
      return { emailTaken: true };
    }
  }

}
