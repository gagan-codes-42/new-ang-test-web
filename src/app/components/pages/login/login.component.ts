import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowLeft, faHome } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { FbAuthService } from 'src/app/shared/services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  faArrowLeft = faArrowLeft;
  faHome = faHome;
  loginForm: FormGroup;
  loading = false;

  @ViewChild('passwordField') passwordField!: ElementRef;

  constructor(
    private router: Router,
    private fbAuth: FbAuthService,
    private fb: FormBuilder,
    private authSvc: AuthService,
    private toastSvc: ToastService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^.{8,32}$')]],
    });
  }

  ngOnInit(): void {
    if (this.authSvc.loginInfo.email) {
      this.loginForm.patchValue({ email: this.authSvc.loginInfo.email });
      this.loginForm.get('email')?.updateValueAndValidity();
    }
  }

  ngAfterViewInit() {
    if (this.authSvc.loginInfo.email) {
      this.passwordField.nativeElement.focus();
    }
  }

  onClickClose() {
    this.router.navigate(['']);
  }

  async login() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authSvc.loginInfo = this.loginForm.value;
      try {
        const loginRes = await this.fbAuth.login(
          this.authSvc.loginInfo.email,
          this.authSvc.loginInfo.password
        );
        const token = await loginRes.user?.getIdToken();
        this.fbAuth.userToken = token || '';
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
                this.fbAuth.userData = res;
                if(this.fbAuth.userData.roles.includes('franchisee')){
                  this.router.navigate(['/dashboard/controlPanel']);
                }else {
                  this.router.navigate(['/landing']);
                }
                
              }
            },
            (err) => {
              this.toastSvc.showErrorToast('Login Failed', `Not Authorized`);
            }
          );
      } catch (err) {
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
  }
}
