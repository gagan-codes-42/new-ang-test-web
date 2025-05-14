import { HttpErrorResponse } from '@angular/common/http';
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
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  faHome = faHome;
  registerForm: FormGroup;
  loading = false;

  public phoneNumber!: number;
  public otpScreenActive: boolean = false;
  public phNumberLengthValid: boolean = false;
  public otpLengthValid: boolean = false;
  otpVerified = false;

  private OTPToken: string = '';
  public OTPSendCount = 0;
  titles = ['Mr.', 'Ms.', 'Mrs.'];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authSvc: AuthService,
    private toastSvc: ToastService,
    private fbAuthSvc: FbAuthService
  ) {
    this.registerForm = this.fb.group({
      title: ['', [Validators.required]],
      firstName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z\\s]+$'),
          Validators.maxLength(15),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z\\s]+$'),
          Validators.maxLength(15),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.email],
        this.validateEmailNotTaken.bind(this),
      ],
      password: ['', [Validators.required, Validators.pattern('^.{8,32}$')]],
      confirmPassword: [''],
      otp: [{value: '', disabled: (this.otpScreenActive && !this.otpVerified)}, [Validators.min(100000), Validators.max(999999), Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.min(1000000001), Validators.max(9999999999), Validators.minLength(10)]]
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

  checkPhoneNumberLength() {
    if (this.registerForm.controls['phoneNumber'].value < 1000000000 || this.registerForm.controls['phoneNumber'].value > 9999999999) {
      this.phNumberLengthValid = false;
    } else {
      this.phNumberLengthValid = true;
    }
  }

  passwordValidation(password: FormControl): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return password.value !== control.value
        ? { passwordNotMatched: true }
        : null;
    };
  }

  ngOnInit(): void {
    console.log(this.registerForm);
  }

  verifyOTP() {
    this.loading = true;
    this.authSvc
      .verifyOTP(
        String(this.registerForm.controls['phoneNumber'].value),
        this.OTPToken,
        String(this.registerForm.controls['otp'].value),
        this.registerForm.controls['firstName'].value,
        this.registerForm.controls['lastName'].value,
        this.registerForm.controls['email'].value,
        this.registerForm.controls['title'].value
      )
      .subscribe(
        async (response) => {
          if (response.valid === 'true') {
            this.otpVerified = true;
            this.startRegistration()
          } else {
            this.loading = false;
            this.toastSvc.showErrorToast(
              'OTP verification failed',
              'Invalid OTP, please enter again'
            );
          }
        },
        (err) => {
          this.loading = false;
          console.log(err);
          this.toastSvc.showErrorToast(
            'OTP verification failed',
            'Some error occured'
          );
        }
      );
  }

  async startRegistration() {
    try {
      const signUpRes = await this.fbAuthSvc.signup(
        this.registerForm.controls['email'].value,
        this.registerForm.controls['password'].value
      );
      const token = await signUpRes.user?.getIdToken();
      this.fbAuthSvc.userToken = token || '';
      this.authSvc
        .signUpSubscriber(
          this.registerForm.controls['title'].value,
          this.registerForm.controls['firstName'].value,
          this.registerForm.controls['lastName'].value,
          this.registerForm.controls['email'].value,
          String(this.registerForm.controls['phoneNumber'].value)
        )
        .subscribe(
          () => {
            this.authSvc.loginInfo = {
              email: this.registerForm.controls['email'].value,
              password: this.registerForm.controls['password'].value,
            };
            this.toastSvc.showSuccessToast(
              'Registration Successful',
              ''
            );
            this.login()
          },
          (err) => {
            this.toastSvc.showErrorToast(
              'Registration Failed',
              `Some Error while Registration`
            );
            console.log(err);
          }
        );
    } catch (err: any) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          this.toastSvc.showErrorToast(
            'Registration Failed',
            `Email is already in use`
          );
          break;
        default:
          this.toastSvc.showErrorToast(
            'Registration Failed',
            'Please try again'
          );
      }
    } finally {
      this.loading = false;
    }
  }

  async login() {
      this.loading = true;
      try {
        const loginRes = await this.fbAuthSvc.login(
          this.authSvc.loginInfo.email,
          this.authSvc.loginInfo.password
        );
        const token = await loginRes.user?.getIdToken();
        this.fbAuthSvc.userToken = token || '';
        this.authSvc
          .loginSubscriber(
            this.authSvc.loginInfo.email,
            this.authSvc.loginInfo.password
          )
          .subscribe(
            (res) => {
              if(res?.message === 'Convert to subscriber'){
              this.authSvc.convertToCustomer().subscribe((res)=> {
                console.log(res);
                 (async ()=> {
                     await this.login();
                   })();
              })
              } else {
                this.toastSvc.showSuccessToast(
                  'Success',
                  'Succesfully logged In'
                );
                this.fbAuthSvc.userData = res;
                if(this.fbAuthSvc.userData.roles.includes('franchisee')){
                  this.router.navigate(['/dashboard/controlPanel']);
                }else {
                  this.router.navigate(['/']);
                }
                
              }
            },
            (err) => {
              this.toastSvc.showErrorToast('Login Failed', `Not Authorized`);
            }
          );
      } catch (err: any) {
        switch (err.code) {
          case 'auth/user-not-found':
            this.toastSvc.showErrorToast(
              'Login Failed',
              `Account doesn't exists`
            );
            break;
          case 'auth/wrong-password':
            this.toastSvc.showErrorToast('Login Failed', 'Invalid Password');
            break;
          default:
            this.toastSvc.showErrorToast('Login Failed', 'Please try again');
        }
      } finally {
        this.loading = false;
      }
  }

  resendOTP() {
    if (this.OTPSendCount < 3) {
      this.authSvc
        .resendOTP(String(this.registerForm.controls['phoneNumber'].value), this.OTPToken)
        .subscribe((res) => {
          this.OTPSendCount++;
          this.toastSvc.showSuccessToast(
            'OTP Resent',
            3 - this.OTPSendCount === 0
              ? `Please check phone number if OTP doesn't arrive`
              : `You can request OTP ${3 - this.OTPSendCount} more time`
          );
          this.OTPToken = res.token;
        });
    }
  }
  checkOTPLength() {
    if (this.registerForm.controls['otp'].value.match(/[0-9]{6}/)) {
      this.otpLengthValid = true;
    } else {
      this.otpLengthValid = false;
    }
  }
  sendOTP() {
    this.OTPSendCount = 0;
    this.loading = true;
    this.authSvc
      .sendOTP(
        String(this.registerForm.controls['phoneNumber'].value),
        String(this.registerForm.controls['firstName'].value),
        String(this.registerForm.controls['lastName'].value),
        String(this.registerForm.controls['email'].value)
      )
      .subscribe(
        (res) => {
          this.toastSvc.showSuccessToast(
            'OTP Sent',
            'It might take some time to arrive'
          );
          this.OTPSendCount++;
          this.OTPToken = res.token;
          this.otpScreenActive = true;
        },
        (err: HttpErrorResponse) => {
          switch (err.status) {
            case 423:
              this.toastSvc.showErrorToast(
                'Duplicate Mobile Number',
                `This number has already been used`
              );
              break;
            default:
              this.toastSvc.showErrorToast(
                'Failed to send OTP',
                `Some error occured`
              );
              break;
          }
        }
      )
      .add(() => {
        this.loading = false;
      });
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
  createZohoContact(payload:any){
    this.authSvc.createZohoContact(payload).subscribe((res:any)=>{console.log(res)},(error:any)=>{console.log(error)})
  }
  
  
}
