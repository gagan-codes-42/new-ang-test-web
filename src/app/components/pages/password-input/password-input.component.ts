import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
})
export class PasswordInputComponent implements OnInit {
  @Output() passwordSubmitted: EventEmitter<any> = new EventEmitter();
  registerForm: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      password: ['', [Validators.required, Validators.pattern('^.{8,32}$')]],
      confirmPassword: [''],
    });
    this.registerForm
      .get('confirmPassword')
      ?.setValidators([
        this.passwordValidation(
          (this.registerForm.get('password') as FormControl) ||
            new FormControl('')
        ),
      ]);

    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.registerForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  ngOnInit(): void {}

  showError(fieldName: string) {
    return (
      this.registerForm.get(fieldName)?.invalid &&
      (this.registerForm.get(fieldName)?.touched ||
        this.registerForm.get(fieldName)?.dirty)
    );
  }

  passwordValidation(password: FormControl): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return password.value !== control.value
        ? { passwordNotMatched: true }
        : null;
    };
  }

  stopLoader() {
    this.loading = false;
  }

  startRegistration() {
    this.loading = true;
    this.passwordSubmitted.emit(this.registerForm.getRawValue());
  }
}
