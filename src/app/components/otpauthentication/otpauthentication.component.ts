import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { FbAuthService } from 'src/app/shared/services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PasswordInputComponent } from '../pages/password-input/password-input.component';

@Component({
  selector: 'app-otpauthentication',
  templateUrl: './otpauthentication.component.html',
  styleUrls: ['./otpauthentication.component.scss'],
})
export class OTPAuthenticationComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  userEmail: any;
  userPass: any;

  loading = false;

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private fbAuth: FbAuthService,
    private toastSvc: ToastService
  ) {}

  public otpScreenActive: boolean = false;
  public phoneNumber!: number;
  public phNumberLengthValid: boolean = false;
  public otp!: string;
  public otpLengthValid: boolean = false;

  private OTPToken: string = '';
  public OTPSendCount = 0;
  otpVerified = false;

  @ViewChild(PasswordInputComponent) passwordRef!: PasswordInputComponent;

  ngOnInit(): void {
    if (!this.authSvc.registrationInfo.email) {
      this.router.navigate(['register']);
    } else {
      this.userEmail = this.authSvc.registrationInfo.email;
      this.userPass = this.authSvc.registrationInfo.password;
    }
  }

  checkPhoneNumberLength() {
    if (this.phoneNumber < 1000000000 || this.phoneNumber > 9999999999) {
      this.phNumberLengthValid = false;
    } else {
      this.phNumberLengthValid = true;
    }
  }

  checkOTPLength() {
    if (this.otp.match(/[0-9]{6}/)) {
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
        String(this.phoneNumber),
        String(this.authSvc.registrationInfo.firstName),
        String(this.authSvc.registrationInfo.lastName),
        String(this.authSvc.registrationInfo.email)
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

  verifyOTP() {
    this.loading = true;
    this.authSvc
      .verifyOTP(
        String(this.phoneNumber),
        this.OTPToken,
        String(this.otp),
        this.authSvc.registrationInfo.firstName,
        this.authSvc.registrationInfo.lastName,
        this.authSvc.registrationInfo.email,
        this.authSvc.registrationInfo.title
      )
      .subscribe(
        async (response) => {
          if (response.valid === 'true') {
            this.otpVerified = true;
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

  async startRegistration(event: any) {
    try {
      const signUpRes = await this.fbAuth.signup(
        this.userEmail,
        event.password
      );
      const token = await signUpRes.user?.getIdToken();
      this.fbAuth.userToken = token || '';
      this.authSvc
        .signUpSubscriber(
          this.authSvc.registrationInfo.title,
          this.authSvc.registrationInfo.firstName,
          this.authSvc.registrationInfo.lastName,
          this.authSvc.registrationInfo.email,
          String(this.phoneNumber)
        )
        .subscribe(
          () => {
            this.fbAuth.logout();
            this.authSvc.loginInfo = {
              email: this.authSvc.registrationInfo.email,
              password: '',
            };
            this.toastSvc.showSuccessToast(
              'Registration Successful',
              'Please Login'
            );
            this.router.navigate(['/login']);
          },
          (err) => {
            this.toastSvc.showErrorToast(
              'Registration Failed',
              `Some Error while Registration`
            );
            this.passwordRef.stopLoader();
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
      this.passwordRef.stopLoader();
    }
  }

  resendOTP() {
    if (this.OTPSendCount < 3) {
      this.authSvc
        .resendOTP(String(this.phoneNumber), this.OTPToken)
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

  goBack() {
    this.otp = '';
    this.loading = false;
    this.otpVerified = false;
    this.phoneNumber = NaN;
  }
}
